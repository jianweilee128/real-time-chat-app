import React from "react";
import "./error-boundary.scss";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <div className="error-boundary-container">
          <img
            className="error-img"
            src="https://cdn.pixabay.com/photo/2016/10/06/19/59/sign-1719892_960_720.png"
            alt="error boundary"
          />
          <h1>Oops...</h1>
          <span>Sorry we are not able to find what you are looking for</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
