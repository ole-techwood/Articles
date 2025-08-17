import { Close, Done } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import type { HistoryListProps } from "../model";
import React from "react";

export const HistoryList: React.FC<HistoryListProps> = ({ history, error }) => {
  return (
    <List>
      {history.map((record, idx) => (
        <React.Fragment key={record.userAnswer + "-" + idx}>
          <ListItem
            secondaryAction={
              record.countryName.toLowerCase() ===
              record.userAnswer.toLowerCase() ? (
                <Done color="success" />
              ) : (
                <Close color="warning" />
              )
            }
          >
            <ListItemAvatar>
              <Avatar
                alt="country-name"
                variant="square"
                src={record.flagImage}
              />
            </ListItemAvatar>
            <ListItemText
              primary={record.userAnswer}
              secondary={record.countryName}
            />
          </ListItem>
          <Divider component="li" variant="middle" />
        </React.Fragment>
      ))}
    </List>
  );
};
