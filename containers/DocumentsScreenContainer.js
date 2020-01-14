import { connect } from "react-redux";
import { uploadFile, getFiles } from "../actions/account";
import DocumentsScreen from "../screens/DocumentsScreen";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.profile,
    files: state.files,
    ...state.session,
    store: state.store
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: data => dispatch(uploadFile(data)),
    getFiles: () => dispatch(getFiles)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsScreen);
