const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'joseatrejos',
    password: 'eh3xvtpxz1yf90xq31ktpkwbs1mdun'
  },
  channels: [
    'joseatrejos'
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('connected', (onConnectedHandler));
client.on('chat', (onChatHandler));
client.on('message', (onMessageHandler));

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  client.say(opts.channels[0], 'Hello from NodeJS');
}

// Called whenever someone chats
function onChatHandler (target, context, message, self) {
    if(self) return;

    // Code to print (in console, obviously) the message, username
    console.log(` ${target} said: ${message}`);
    console.log(context);

    // Recognition of message to answer Marco - Polo
    if(message == "marc" || message == "Marc"){
        client.say(opts.channels[0], 'Anthony');
    }
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    
    // This will write (in the Twitch chat) the username of the person who rolled a dice and the number rolled 
    client.say(target, `${context.username} : You rolled a ${num}`);
    
    // Prints the executed command in console
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}