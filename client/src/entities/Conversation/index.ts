import { fromPairs } from 'lodash-es';

export { ConversationCard } from './ui/ConversationCard/ConversationCard';
export { NewChatCard } from './ui/NewChatCard/NewChatCard';
export { ConversationList } from './ui/ConversationList/ConversationList';
export { CurrentChatCard } from './ui/CurrentChatCard/CurrentChatCard';

// Types

export type {
  ConversationState,
  IMessage,
  IConversation
} from './model/types/conversation';

// Slices/Reducers

export {
  conversationActions,
  conversationReducer
} from './model/slice/conversationSlice';

export { getFetchConversations } from './model/service/getFetchConversations';
export { getFetchMessages } from './model/service/getFetchMessages';

// Selectors
export { getConvData } from './model/selectors/getConvData';
export { getMessageData } from './model/selectors/getMessageData';
export { getCurrentChat } from './model/selectors/getCurrentChat';
export { getIsNewCovAdded } from './model/selectors/getIsNewCovAdded';

// Services

export { createMessage } from './model/service/createMessage';
