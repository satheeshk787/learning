import React, { Component } from 'react';
import { Box, Button, Hidden, Modal, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import HomeRequest from '../HomeRequest';

interface EditItemState {
  success: boolean | null;
}

interface EditItemProps {
    onEditSuccessChange?: (success: boolean | null) => void;
    isOpen: boolean;
    handleClose: () => void;
    editValues? :{
      name?:string,
      _id?:string
    }
  }

  class EditItem extends Component<EditItemProps, EditItemState> {
  state: EditItemState = {
    success: null,
  };


  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const req = new HomeRequest();
    const name = data.get('name') as string;
    const _id = data.get('_id') as string;
    const response = await req.editList({
      name,
      _id
    });

    // Close the modal if successful
    if(name)
    {
      const success = response?.data.success || false;
      this.setState({ success });
      if(this.props.onEditSuccessChange)
      {
        this.props.onEditSuccessChange(success);
        this.props.handleClose();
      }
    }  
    
  };

  removeList = async (_id:string) => {
    const request = new HomeRequest();
    try {
      const response = await request.deleteList(_id);
      const success = response?.data.success || false;
      this.setState({ success });
      if(this.props.onEditSuccessChange)
      {
        this.props.onEditSuccessChange(success);
        this.props.handleClose();
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {

    // console.log(this.props.editValues);

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

    const { success } = this.state;

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
        <Modal
          open={this.props.isOpen? true: false}
          onClose={this.props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit item
            </Typography>
            <div id="modal-modal-description">
              {success === true ? (
                <Typography variant="body1" color="success">
                  Item updated successfully!
                </Typography>
              ) : success === false ? (
                <Typography variant="body1" color="error">
                  Failed to update item.
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
                  defaultValue={this.props.editValues?.name}
                />
                <input type='hidden' name='_id' value={this.props.editValues?._id} />
                

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ border: '1px solid #44d74f', color: '#44d74f', mt: 3, mb: 2 }}
                  color="success"
                >
                  Update
                </Button>

                <Button
                  onClick={()=> this.props.editValues?._id && this.removeList(this.props.editValues?._id)}
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>
      </>
    );
  }
}

export default EditItem;
