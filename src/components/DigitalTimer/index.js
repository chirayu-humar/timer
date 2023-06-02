// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, isRunning: false}

  componentWillUnmount() {
    console.log('component will unmount')
    clearInterval(this.timerId)
  }

  minuteChangeIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        seconds: prevState.seconds,
        isRunning: prevState.isRunning,
      }))
    }
  }

  minuteChangeReduce = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: prevState.seconds,
        isRunning: prevState.isRunning,
      }))
    }
  }

  startTimer = () => {
    console.log('startTimer called')
    const {minutes, seconds} = this.state
    this.timerId = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timerId)
        console.log('time stopped')
        this.setState(prevState => ({
          minutes: prevState.minutes,
          seconds: prevState.seconds,
          isRunning: false,
        }))
      } else {
        this.tick()
      }
    }, 1000)
  }

  stopTimer = () => {
    console.log('stopTimer called')
    clearInterval(this.timerId)
  }

  startAndStopTheTimer = () => {
    console.log('startAndStopTimer called')
    const {isRunning} = this.state
    if (isRunning) {
      this.stopTimer()
      this.setState(prevState => ({
        minutes: prevState.minutes,
        seconds: prevState.seconds,
        isRunning: false,
      }))
    } else {
      this.startTimer()
      this.setState(prevState => ({
        minutes: prevState.minutes,
        seconds: prevState.seconds,
        isRunning: true,
      }))
    }
  }

  tick = () => {
    const {minutes, seconds} = this.state
    console.log('tick function called')
    if (seconds === 0 && minutes === 0) {
      console.log('no change')
      clearInterval(this.timerId)
      this.setState(prevState => ({
        minutes: prevState.minutes,
        seconds: prevState.seconds,
        isRunning: false,
      }))
    } else if (seconds === 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
        isRunning: prevState.isRunning,
      }))
    } else {
      this.setState(prevState => ({
        minutes: prevState.minutes,
        seconds: prevState.seconds - 1,
        isRunning: prevState.isRunning,
      }))
    }
  }

  resetFunction = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      minutes: 25,
      seconds: 0,
      isRunning: false,
    }))
  }

  render() {
    let {minutes, seconds} = this.state
    const {isRunning} = this.state
    if (Math.floor(minutes / 10) === 0) {
      minutes = '0'.concat(minutes.toString())
    }
    if (Math.floor(seconds / 10) === 0) {
      seconds = '0'.concat(seconds.toString())
    }
    return (
      <div className="bg-container">
        <div className="first">
          <h1>Digital Timer</h1>
        </div>
        <div className="second">
          <div className="secondChild1">
            <div className="middle">
              <h1>
                {minutes}:{seconds}
              </h1>
              {isRunning && <p>Running</p>}
              {!isRunning && <p>Paused</p>}
            </div>
          </div>
          <div className="secondChild2">
            <div className="child">
              <div className="firstBtnContainer">
                <button
                  onClick={this.startAndStopTheTimer}
                  className="special"
                  type="button"
                >
                  {!isRunning && (
                    <img
                      alt="play icon"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="iconImage"
                    />
                  )}
                  {isRunning && (
                    <img
                      alt="pause icon"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="iconImage"
                    />
                  )}
                  {isRunning && <p>Pause</p>}
                  {!isRunning && <p>Start</p>}
                </button>
              </div>
              <div className="secondBtnContainer">
                <button
                  onClick={this.resetFunction}
                  className="special"
                  type="button"
                >
                  <img
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="iconImage"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="child">
              <p>set Timer limit</p>
            </div>
            <div className="child">
              <div>
                <button
                  onClick={this.minuteChangeReduce}
                  className="special"
                  type="button"
                >
                  -
                </button>
              </div>
              <div>
                <p className="imp">{minutes}</p>
              </div>
              <div>
                <button
                  onClick={this.minuteChangeIncrement}
                  className="special"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    )
  }
}

export default DigitalTimer
