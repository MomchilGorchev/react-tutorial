let CommentBox = React.createClass({
    render(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

let CommentList = React.createClass({
    render(){
        return (
            <div className="commentList">
                <Comment author="Pete Hunt">This is the first comment </Comment>
                <Comment author="Pete Hunt">This is the second comment </Comment>
            </div>
        );
    }
});

let CommentForm = React.createClass({
    render(){
        return (
            <div className="commentForm">
                Hello, im comment form
            </div>
        );
    }
});

let Comment = React.createClass({

    rawMarkup(){
        let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    render(){
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.querySelector('#content')
);
