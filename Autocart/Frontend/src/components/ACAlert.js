import React from "react";
import { Button, Modal } from "semantic-ui-react";

export const ACAlert = ({ title, message, close }) => {
  <Modal size="small" open="true" onClose={close}>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <p>{message}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative>No</Button>
      <Button positive icon="checkmark" labelPosition="right" content="Yes" />
    </Modal.Actions>
  </Modal>;
};
