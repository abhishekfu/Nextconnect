const styles = (theme) => ({
	list: {
		backgroundColor: 'inherit',
		backdropFilter: 'inherit'
	},
	user: {
		color: '#000000',
		fontWeight: 'bold'
	},
	text: {
		color: '#000035'
	},
	root: {
		width: '100%',
		margin: 0
	},
	paper: {
		marginTop: theme.spacing(14),
		marginLeft: 0,
		marginRight: 0,
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
	}
});

export default styles;
