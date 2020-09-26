import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PostItemStyles';
import { UserContext } from './context/user.context';
import { PostContext } from './context/post.context';
import AddCommentForm from './AddCommentForm';
import moment from 'moment';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
	CardActions,
	Collapse,
	Typography,
	Divider,
	Card,
	CardHeader,
	Avatar,
	CardMedia,
	CardContent,
	IconButton,
	Badge,
	Grid
} from '@material-ui/core';
import MyPopper from './MyPopper';
function PostItem({ post, classes }) {
	const [ expanded, setExpanded ] = React.useState(false);
	let { user, userDict } = useContext(UserContext);
	let { addRemoveLike } = useContext(PostContext);
	const getUser = (userId) => {
		let User = null;
		if (userDict === null) {
			userDict = localStorage.getItem('users');
		}
		userDict.users.forEach((user) => {
			if (user._id === userId) {
				User = user;
			}
		});
		return User;
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleLike = () => {
		if (user !== null) {
			const type = post.likes.indexOf(user.id) === -1 ? 'like' : 'unlike';
			addRemoveLike(user.id, post._id, type);
		}
	};

	const postComments = post.comments.map((comment, i) => {
		const { username, profileImageUrl } = getUser(comment.commentedBy);
		return (
			<React.Fragment key={i}>
				<Grid
					className={classes.border}
					container
					direction="column"
					justify="flex-start"
					alignItems="flex-start"
				>
					<Grid container direction="row" justify="flex-start" alignItems="flex-start">
						<Grid item xs={9}>
							<Grid container direction="row" justify="flex-start" alignItems="flex-start">
								<Avatar alt={username} src={profileImageUrl} className={classes.small} />
								<Typography
									className={classes.nomargin}
									variant="body1"
									color="textPrimary"
									component="p"
								>
									{username}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="body2" color="textSecondary" component="p">
								{moment(comment.createdAt).format('MMM Do YY')}
							</Typography>
						</Grid>
					</Grid>

					<Typography align="left" className={classes.text} variant="body2" color="textPrimary" component="p">
						{comment.text}
					</Typography>
				</Grid>

				{i < post.comments.length - 1 && <Divider variant="inset" />}
			</React.Fragment>
		);
	});

	return (
		<Grid item xs={12}>
			<Card className={classes.root}>
				<Grid container direction="row" justify="flex-start" alignItems="center">
					<CardHeader
						className={classes.header}
						avatar={<Avatar alt={post.postedBy.username} src={post.postedBy.profileImageUrl} />}
						title={post.postedBy.username}
						subheader={moment(post.createdAt).format('Do MMM, YY')}
						action={<MyPopper userId={post.postedBy._id} postId={post._id} />}
					/>
				</Grid>
				{post.isImage && <CardMedia className={classes.media} image={post.imageUrl} title={post.text} />}
				<Grid container direction="row" justify="flex-start" alignItems="center">
					<CardContent>
						<Typography align="left" variant="body2" color="textPrimary" component="p">
							{post.text}
						</Typography>
					</CardContent>
				</Grid>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites" onClick={handleLike}>
						<Badge badgeContent={post.likes.length} color="secondary">
							{user !== null && post.likes.indexOf(user.id) === -1 ? (
								<FavoriteBorderIcon />
							) : (
								<FavoriteIcon />
							)}
						</Badge>
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent className={classes.divider}>
						<Grid container direction="column" justify="flex-start" alignItems="flex-start">
							{post.comments.length > 0 && (
								<Typography paragraph style={{ textDecoration: 'underline' }}>
									Comments:
								</Typography>
							)}
							{postComments}
							<AddCommentForm postId={post._id} />
						</Grid>
					</CardContent>
				</Collapse>
			</Card>
		</Grid>
	);
}

export default withStyles(styles)(PostItem);
