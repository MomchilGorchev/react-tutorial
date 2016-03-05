
let CommentBox = React.createClass({

    getInitialState(){
        return {data: []};
    },

    loadCommentsFromServer(){
        // Necessary as of the conflict between .bind(this) in ES6
        let _this = this;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success(data){
                _this.setState({data});
            },
            error(xhr, status, err){
                console.error(_this.props.url, status, err.toString())
            }
        });
    },

    // Method called automatically after the componenet is rendered
    // for the first time.
    componentDidMount(){

        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer(), this.props.pollInterval);

    },

    render(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});

let CommentList = React.createClass({
    render(){
        let commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author} key={comment.id} >
                    {comment.text}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

let CommentForm = React.createClass({

    getInitialState(){
        return {author: '', text: ''};
    },

    handleAuthorChange(e){
        this.setState({author: e.target.value});
    },

    handleTextChange(e){
        this.setState({text: e.target.value});
    },
    
    render(){
        return (
            <form className="commentForm">
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" />
            </form>
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
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.querySelector('#content')
);
