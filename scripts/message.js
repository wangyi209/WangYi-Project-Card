// TODO: hiding the webhook URL
const webhookURL = "https://discord.com/api/webhooks/1381820963804418101/dW3P8HXL6jL6fzKLVjz6y0M_Pa3AOXUCyirWx7yd6dZrLBttCxz9Q8jIK_b36d4Kxbar";
const messageInput = document.getElementById("message-input");

// 			break;
// 	}
let lastMessageTime = 0;

messageInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter" && messageInput.value.trim() !== "") {
		const currentTime = Date.now();
		if (currentTime - lastMessageTime >= 5000) {
			const messageContent = sanitizeMessage(messageInput.value);
			sendMessage(messageContent);
			messageInput.value = "";
			lastMessageTime = currentTime;
		} else {
			alert("Please wait at least 5 seconds before sending the next message!");
		}
	}
});

function sanitizeMessage(message) {
	const sanitizedMessage = message.replace(/@/g, "@.");
	return sanitizedMessage;
}

function sendMessage(message) {
	const data = {
		content: message,
	};

	fetch(webhookURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Sending message failed.");
			}
		})
		.catch((error) => {
			console.error("Error: " + error.message);
		});
}
// 	}
// 	elements.customStatusText.innerHTML = "";
// 	if (activities && activities.length > 0) {	
// 		const customStatus = activities.find(activity => activity.type === 4);
// 		if (customStatus) {
// 			elements.customStatusText.innerHTML = customStatus.state || "";
