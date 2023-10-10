import React, { Component } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import HomeRequest from '../HomeRequest';

interface AddItemState {
  open?: boolean;
  success: boolean | null; // Add success flag
}

interface AddItemProps {
    onAddSuccessChange?: (success: boolean | null) => void;
  }

  class AddItem extends Component<AddItemProps, AddItemState> {
  state: AddItemState = {
    open: false,
    success: null,
  };

  handleOpen = () => this.setState({ open: true, success: null });
  handleClose = () => this.setState({ open: false, success: null });

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const req = new HomeRequest();
    const name = data.get('name') as string;
    const response = await req.addToList({
      name,
    });

    // Close the modal if successful
    const success = response?.data.success || false;
    this.setState({ success });
    this.props.onAddSuccessChange && this.props.onAddSuccessChange(success);
  };

  render() {
    const WhiteTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: '#44d74f',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#44d74f',
        },
        '& .MuiInputLabel-root': {
            color: '#44d74f',
        },
        '& .MuiOutlinedInput-input': {
            color: '#44d74f',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: '#44d74f',
            },
            '&:hover fieldset': {
            borderColor: '#44d74f',
            },
            '&.Mui-focused fieldset': {
            borderColor: '#44d74f',
            },
        },
    });

    const { open, success } = this.state;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#000',
        boxShadow: 24,
        p: 4,
    };

    return (
      <>
        <Button
          variant="outlined"
          sx={{ border: '1px solid #44d74f', color: '#44d74f' }}
          color="success"
          onClick={this.handleOpen}
        >
          Add Item
        </Button>
        <Modal
          open={this.state.open? true: false}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new item
            </Typography>
            <div id="modal-modal-description">
              {success === true ? (
                <Typography variant="body1" color="success">
                  Item added successfully!
                </Typography>
              ) : success === false ? (
                <Typography variant="body1" color="error">
                  Failed to add item.
                </Typography>
              ) : null}
              <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                <WhiteTextField
                  autoFocus={true}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Item name"
                  name="name"
                  autoComplete="email"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ border: '1px solid #44d74f', color: '#44d74f', mt: 3, mb: 2 }}
                  color="success"
                >
                  Add to list
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>
      </>
    );
  }
}

export default AddItem;
