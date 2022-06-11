import React from "react";
import "./Joke.css";

// Class component ---------------------------------
class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.vote = this.props.vote;
    this.downVote = this.downVote.bind(this);
    this.upVote = this.upVote.bind(this);
    // ({ vote, votes, text, id })
  }


  upVote = () => this.vote(this.props.id, +1);
  downVote = () => this.vote(this.props.id, -1);

  render() {
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={this.upVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={this.downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {this.props.votes}
      </div>

      <div className="Joke-text">{this.props.text}</div>
    </div>
  );
}
}

// // Functional component ---------------------------------
// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

export default Joke;
