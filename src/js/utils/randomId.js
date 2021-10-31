// https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript/#:~:text=Javascript%20does%20not%20have%20any,to%20generate%20unique%20random%20ids.

export const randomId = () => {
	return Math.floor((1 + Math.random()) * 0x1000000)
		.toString(16)
		.substring(1)
}
