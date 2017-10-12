// import React from "react";
// import { connect } from "react-redux";
// import { Button, Panel, OverlayTrigger, Popover } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Heart from "react-icons/lib/ti/heart-full-outline";
// import Like from "react-icons/lib/ti/thumbs-up";
// import NotLike from "react-icons/lib/ti/thumbs-down";
// import * as Map from "../Maps.js";

// const BotosControle = (props) => {
//     return (
//         <div style={{ marginTop: "20px" }}>
//         <OverlayTrigger
//           trigger={["hover", "focus"]}
//           placement="bottom"
//           overlay={props.popoverHoverFocus("Editar Post")}
//         >
//           <Link to="#">
//             <BotaoEditar
//               size={"40px"}
//               onClick={() => props.abrirModal()}
//             />
//           </Link>
//         </OverlayTrigger>

//         <OverlayTrigger
//           trigger={["hover", "focus"]}
//           placement="bottom"
//           overlay={popoverHoverFocus(
//             "Remover Post"
//           )}
//         >
//           <Link className="close-search" to="/">
//             <IconTrash
//               size={"40px"}
//               onClick={() =>
//                 props.deletPost(
//                   props.posts,
//                   props.postUnico.id
//                 )}
//               style={{ color: "red", marginLeft: "30px" }}
//             />
//           </Link>
//         </OverlayTrigger>
//       </div>
//     )
// }

// const mapStateToProps = store => {
//     const posts = store.posts["posts"];
//     return {
//       posts
//     };
//   };

// export default connect(mapStateToProps, Map.mapDispatchToProps)(Votacao);