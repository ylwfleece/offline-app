import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Input, Button } from "antd";
import { DataStore } from "@aws-amplify/datastore";
import { Message } from "./models";

const initialState = { color: "#000000", title: "" };

function App() {
  const [formState, updateFormState] = useState(initialState);
  const [messages, updateMessages] = useState([]);
  const [showPicker, updateShowPicker] = useState(false);

  function onChange(e) {
    if (e.hex) {
      updateFormState({ ...formState, color: e.hex });
    } else {
      updateFormState({ ...formState, title: e.target.value });
    }
  }

  async function fetchMessages() {
    const messages = await DataStore.query(Message);
    updateMessages(messages)
  }

  async function createMessage() {
    if (!formState.title) return 
    await DataStore.save(new Message({...formState}))
    updateFormState(initialState)
  }
}
