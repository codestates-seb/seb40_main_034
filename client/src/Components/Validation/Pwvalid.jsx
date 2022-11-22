import { useState } from 'react';

const handlePw = (e) => {
	const [pw, setPw] = useState('');
	const [pwValid, setPwValid] = useState(false);

	setPw(e.target.value);
	const regex = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$/;
	if (regex.test(pw)) {
		return setPwValid(true);
	} else {
		return setPwValid(false);
	}
};
export default handlePw;
