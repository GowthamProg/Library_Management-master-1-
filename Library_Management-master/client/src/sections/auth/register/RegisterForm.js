import { Button, TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

export default function RegisterForm({ registerUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(name, email, password, photoUrl, isAdmin);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Box>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Box>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Box>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Photo URL"
          variant="outlined"
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
        />
      </Box>
      <Box mb={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Is Admin"
        />
      </Box>
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
}
