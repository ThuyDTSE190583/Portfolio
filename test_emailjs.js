async function testEmail() {
  const payload = {
    service_id: "service_7bl7dqg",
    template_id: "template_zgvj9ff",
    user_id: "06cVm8JGrC5wUUaQy",
    template_params: {
      from_name: "Test",
      reply_to: "test@test.com",
      message: "Hello"
    }
  };

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error(err);
  }
}

testEmail();
