import React, { Component } from "react";
import Statistics from "./Components/Statistics/Statistics";
import FeedbackOption from "./Components/FeedbackOption/FeedbackOption";
import Notification from "./Components/Notification/Notification";
import Section from "./Components/Section/Section";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    const total = (good / (good + neutral + bad)) * 100;
    return Math.round(total);
  };

  onLeaveFeedback = (event) => {
    const nameBtn = event.target.name;

    this.setState((prevState) => ({
      [nameBtn]: prevState[nameBtn] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const keyObject = Object.keys(this.state);
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div className="App">
        <Section title="Please leave feedback">
          <FeedbackOption
            options={keyObject}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
