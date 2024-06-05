import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTonConnect } from '../hooks/useTonConnect';
import { makeRequest } from '../utils/makeRequest';
import { API_URL } from '../config';
import { useTonAddress } from '@tonconnect/ui-react';

export const PurchaseModal = ({ open, handleClose }: any) => {
  const { sender} = useTonConnect();
  const wallet = useTonAddress()
  // const wallet = 'EQB84UaTZ8E5VauyUCyh9rpqjaw_G5Q3uEaYQJu6jzYtzeyN';
  console.log('wallet', wallet);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: any) => {
      const value = event.target.value;
      setQuantity(value);
  };

  const handleSubmit = async () => {
    if (quantity <= 0) {
      return;
    }
    const res =  await sender.send({ to: 'UQDGUvYWclDqT0QySRSXgbUOjmgS-R_Sd851OWgoio_CUtw8',  value: quantity * 1000000000 }).catch((err: Error) => {
      console.log(err);
      return null;
    });

    if (res) {
      const res = await makeRequest({url: `${API_URL}/buy-completed`, method: 'POST', wallet, body: {txId: 'txId' }});
      console.log(res);
    }
    handleClose();  // Close the modal after submission
  };

  return (
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Buy Items</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  How many items would you like to buy?
              </DialogContentText>
              <TextField
                  autoFocus
                  margin="dense"
                  id="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={quantity}
                  onChange={handleQuantityChange}
              />
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
      </Dialog>
  );
}