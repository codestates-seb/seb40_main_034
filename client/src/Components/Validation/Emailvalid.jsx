import { useState } from 'react';

const handleEmail = (e) => {
	const [emailValid, setEmailValid] = useState(false);
	const [email, setEmail] = useState('');

	setEmail(e.target.value);
	const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
	if (regex.test(email)) {
		setEmailValid(true);
	} else {
		setEmailValid(false);
	}
};
export default handleEmail;
