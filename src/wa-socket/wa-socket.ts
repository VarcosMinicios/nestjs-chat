import type { Boom } from '@hapi/boom';
import type { MessagesService } from '../messages/messages.service';
import type { ContactsService } from '../contacts/contacts.service';
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  WASocket,
} from '@whiskeysockets/baileys';
import P from 'pino';

const logger = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` }).child(
  {},
);
logger.level = 'silent';

export class WhatsappSocket {
  private socket: WASocket;

  private whatsappId: string;

  constructor(
    private id: string,
    private readonly userId: string,
    private readonly messagesService: MessagesService,
    private readonly contactsService: ContactsService,
  ) {}

  async init() {
    const { state, saveCreds } =
      await useMultiFileAuthState('baileys_auth_info');
    const { version } = await fetchLatestBaileysVersion();

    this.socket = makeWASocket({
      version,
      logger,
      printQRInTerminal: true,
      syncFullHistory: false,
      mobile: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger),
      },
      generateHighQualityLinkPreview: true,
      shouldIgnoreJid: (jid) => isJidBroadcast(jid),
      getMessage: this.messagesService.findOne,
    });

    this.addEventListeners(saveCreds);
  }

  private addEventListeners(saveCreds: () => Promise<void>) {
    this.socket.ev.on('messaging-history.set', async (event) => {
      const { chats, contacts, messages } = event;
      await this.messagesService.createOrUpdateMany(
        messages,
        this.userId,
        this.whatsappId,
      );

      await this.contactsService.createOrUpdateMany(
        contacts,
        this.userId,
        this.whatsappId,
      );

      await this.contactsService.createOrUpdateMany(
        chats,
        this.userId,
        this.whatsappId,
      );
    });

    this.connectionCredsListeners(saveCreds);
    this.messageListeners();
    this.chatListeners();
    this.contactListeners();
    this.groupListeners();
    this.generalListeners();
  }

  private connectionCredsListeners(saveCreds: () => Promise<void>) {
    this.socket.ev.on('connection.update', async (update) => {
      // console.log('connection update', update);

      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;

        if (statusCode !== DisconnectReason.loggedOut) await this.init();
        else console.log('Connection closed. You are logged out.');
      }
    });

    this.socket.ev.on('creds.update', async (creds) => {
      if (creds.me?.id) this.whatsappId = formatJid(creds.me.id);
      await saveCreds();
    });
  }

  private messageListeners() {
    this.socket.ev.on('messages.upsert', async (upsert) => {
      // console.log('messages.upsert ', JSON.stringify(upsert, undefined, 2));
    });

    this.socket.ev.on('messages.update', async (update) => {
      // console.log('messages.update', JSON.stringify(update, undefined, 2));
    });

    this.socket.ev.on('messages.delete', async (keys) => {
      // console.log('messages.delete', keys);
    });

    this.socket.ev.on('messages.media-update', async (media) => {
      // console.log('messages.media-update', media);
    });

    this.socket.ev.on('message-receipt.update', async (userReceipt) => {
      // console.log('message-receipt.update', userReceipt);
    });

    this.socket.ev.on('messages.reaction', async (reaction) => {
      // console.log('messages.reaction', reaction);
    });
  }

  private chatListeners() {
    this.socket.ev.on('chats.upsert', async (chats) => {
      // console.log('chats.upsert', chats);
    });

    this.socket.ev.on('chats.update', async (chats) => {
      // console.log('chats.update', chats);
    });

    this.socket.ev.on('chats.delete', async (chats) => {
      // console.log('chats.delete', chats);
    });
  }

  private contactListeners() {
    this.socket.ev.on('contacts.upsert', async (contacts) => {
      // console.log('contacts.upsert', contacts);
    });

    this.socket.ev.on('contacts.update', async (contacts) => {
      // console.log('contacts.update', contacts);
      // for (const contact of contacts) {
      //   if (typeof contact.imgUrl !== 'undefined') {
      //     const newUrl =
      //       contact.imgUrl === null
      //         ? null
      //         : await socket!.profilePictureUrl(contact.id!).catch(() => null);
      // //     console.log(`contact ${contact.id} has a new profile pic: ${newUrl}`);
      //   }
      // }
    });
  }

  private groupListeners() {
    this.socket.ev.on('groups.upsert', async (groupData) => {
      // console.log('groups.upsert', groupData);
    });

    this.socket.ev.on('groups.update', async (groupData) => {
      // console.log('groups.update', groupData);
    });

    this.socket.ev.on('group-participants.update', async (participants) => {
      // console.log('group-participants.update', participants);
    });
  }

  private generalListeners() {
    this.socket.ev.on('labels.association', (event) => {
      // console.log('labels.association', event);
    });

    this.socket.ev.on('labels.edit', (label) => {
      // console.log('labels.edit', label);
    });

    this.socket.ev.on('call', (call) => {
      // console.log('call', call);
    });

    this.socket.ev.on('presence.update', async (presence) => {
      // console.log('presence.update', presence);
    });

    this.socket.ev.on('blocklist.set', async (blocklist) => {
      // console.log('blocklist.set', blocklist);
    });

    this.socket.ev.on('blocklist.update', async (blocklist) => {
      // console.log('blocklist.update', blocklist);
    });

    this.socket.ev.process(async (events) => {
      // console.log(Object.keys(events));
    });
  }
}

export const formatJid = (jid: string) => {
  const number = jid.split(':')[0];
  const suffix = jid.split('@')[1];
  return `${number}@${suffix}`;
};
