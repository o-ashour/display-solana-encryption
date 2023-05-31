// elements
const displayMsgEL = document.querySelector('p')
const inputEL = document.querySelector('input')
const buttonEL = document.querySelector('button')
const encryptionDataListEL = document.querySelector('ul')
const encryptionDataHeaderEL = document.querySelector('header')

// listeners
buttonEL.addEventListener('click', handleBtnClick);

// make POST fetch request to server with message
const fetchAPI = async (inputMsg) => {
  const data = {
    message: inputMsg,
  };

  const response = await fetch('http://localhost:5000/encrypt-message', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  return json;
}

function handleBtnClick(){
  displayEncryptedMsg();
}

async function displayEncryptedMsg(){
  encryptionDataListEL.innerHTML = ''
  const encryptedData = await fetchAPI(inputEL);
  encryptionDataHeaderEL.innerText = `The Solana Encryption for '${inputEL.value}' is: `;

  for (const key in encryptedData) {
    console.log(`${key}: ${encryptedData[key]}`);
    const liEL = document.createElement('li');
    encryptionDataListEL.appendChild(liEL).innerText = `${key}: ${encryptedData[key]}`;
  }
}




