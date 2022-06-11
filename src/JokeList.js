import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

// Refactored class based component:
class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props)
    // ({ numJokesToGet = 10 }) TODO COME BACK AND SET DEFAULT
    this.state = { jokes: [] }
      // console.log("joke", jokes)
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
    }

    async fetchJokes() {
      let j = [...this.state.jokes];
      // console.log("j inside useEffect", j)
      let seenJokes = new Set();
      try {
        while (j.length < this.props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({jokes: j});
      } catch (e) {
        console.log(e);
      }

      }
    

    /* get jokes if there are no jokes */
    componentDidMount() {  
      if (this.state.jokes.length === 0) this.fetchJokes(); 
    }

    componentDidUpdate() {  
      if (this.state.jokes.length === 0) this.fetchJokes(); 
    }

    /* empty joke list and then call getJokes */
    generateNewJokes() {
      this.setState({ jokes: [] });
    }

    /* change vote for this id by delta (+1 or -1) */
    vote(id, delta) {
      this.setState(allJokes => ({
        jokes: allJokes.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
      }));
    };

    
    /* render: either loading spinner or list of sorted jokes. */
    render(){
    if (this.state.jokes.length) {
      // console.log("this state jokes", ...this.state.jokes);
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
           {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }
  
    return null;

  }
}


// // Function Based Component _________________________________________________
// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);
//   // console.log("joke", jokes)

//   /* get jokes if there are no jokes */

//   useEffect(function () {
//     async function getJokes() {
//       // spreads current state into new array of objects
//       let j = [...jokes];
//       // console.log("j inside useEffect", j)
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;

//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
        
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>

//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

export default JokeList;
