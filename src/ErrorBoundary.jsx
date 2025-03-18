import { Component } from "react";  
import { Link } from "@tanstack/react-router";

/**
 * React Class componet example using ErrorBoundary
 */
class ErrorBoundary extends Component {
  // by default, we have no error
  state = { hasError: false };
  /**
   * static function runs if an error crashes the app to fin and display the error message
   * @returns 
   */
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  /**
   * Invoked after an error has been thrown by a descendant component.
   * Dispatches an error to the console.
   * @param {Error} error - The error that was thrown.
   * @param {Object} info - An object with a componentStack property containing
   *   information about which component threw the error.
   */
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  //in a class component, the render method is required and is where we return the JSX content
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      )
    }
    // if there is no error, just render the children inside the ErrorBoundary and keep the Erro Boundary itself invisible
    return this.props.children;
  }
}

export default ErrorBoundary;