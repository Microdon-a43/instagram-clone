import { type IComment } from '@/entities/PostCard';
import { Button, Form, HStack, Icon, Input, VStack } from '@/shared/ui';
import { Modal } from 'antd';
import EmojiPicker, {
  type EmojiClickData,
  EmojiStyle
} from 'emoji-picker-react';
import { useState, type ChangeEvent } from 'react';
import styles from './EditCommentModal.module.scss';
import {
  EditCommentNames,
  useCommentEditSchema
} from '@/features/Comment/index';
import { type EditCommentValues } from '../../model/schema/useCommentEditSchema';

interface EditCommentModalProps {
  isOpen?: boolean;
  onClose: () => void;
  comment: IComment;
}

export const EditCommentModal = ({
  isOpen,
  onClose,
  comment
}: EditCommentModalProps) => {
  const { register, watch, handleSubmit, isValid, errors, defaultValues } =
    useCommentEditSchema({ comment });
  const [showPickers, setShowPickers] = useState(false);
  const [newContent, setNewContent] = useState('');

  // const handleChanges = (emojiData: EmojiClickData, event: MouseEvent) => {};

  // const onSubmit = (data: EditCommentValues) => {
  // };

  return (
    <VStack className={styles.edit}>
      <Modal
        title="Изменить комментарий"
        open={isOpen}
        onCancel={onClose}
        footer={false}
        className={styles.modal}
        centered
      >
        <Form>
          <VStack className={styles.input} gap={8}>
            <Input
              {...register(EditCommentNames.CONTENT)}
              value={newContent}
              placeholder={EditCommentNames.CONTENT}
              error={errors?.content?.message}
              className={styles.textarea}
              textarea
            />
            <HStack justify="between">
              <Icon
                type="Emoji"
                onClick={() => {
                  setShowPickers(!showPickers);
                }}
              />
              {/* {showPickers && (
                <div className={styles.pickers}>
                  <EmojiPicker
                    onEmojiClick={handleChanges}
                    autoFocusSearch={false}
                    emojiStyle={EmojiStyle.NATIVE}
                  />
                </div>
              )} */}
              <Button type="submit">Изменить</Button>
            </HStack>
          </VStack>
        </Form>
      </Modal>
    </VStack>
  );
};
