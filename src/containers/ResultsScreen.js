import {connect} from "react-redux";
import ResultList from "../components/ResultList";

const Connected = connect(state => {
	return {
		results: state.gameHistory.items
	};
})(ResultList);

export default Connected;
