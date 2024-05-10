import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <CardContent>
          <Typography variant="h5">
            3+2 Villa for Sale in Çayyolu Altın Terazi Site
          </Typography>
          <Typography variant="body2">10% off on first key delivery</Typography>
          <div className="py-2 space-y-2">
            <p>Turkey</p>
            <p className="text-sm text-blue-500">February 14, 2024 12:00 AM</p>
            <p className="text-sm text-red-500">February 15, 2024 12:00 AM</p>
          </div>
        </CardContent>

        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
