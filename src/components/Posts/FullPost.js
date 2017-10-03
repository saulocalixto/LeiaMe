import React from "react";
import * as AppCss from "../../style/PostsCss.js";
import * as Map from "../Maps.js";
import HeaderPost from "./HeaderPost.js"
import Comments from "../Comments/CommentsView.js"
import { connect } from "react-redux";
import { Button, Panel, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import IconTrash from 'react-icons/lib/md/delete'
import Heart from 'react-icons/lib/ti/heart-full-outline'
import Like from 'react-icons/lib/ti/thumbs-up'
import NotLike from 'react-icons/lib/ti/thumbs-down'
import BotaoEditar from 'react-icons/lib/ti/pencil';
import * as PostsCss from "../../style/PostsCss.js";
import sortBy from 'sort-by'

const popoverHoverFocus = (ponto) => (
    <Popover id="popover-trigger-hover-focus" title="Vote Score">
        <strong>{ponto} Ponto(s)!</strong>
    </Popover>
);

const popoverHoverFocusDelete = (remove) => (
    <Popover id="popover-trigger-hover-focus" title="Vote Score">
        <strong>Remover {remove}!</strong>
    </Popover>
);

const FullPost = (props) => {
    return (
        <div style={ {...AppCss.postagens, width:'600px' } }>
            <Panel
                header={`${props.postUnico.title} || Por: ${props.postUnico.author}`}
                bsStyle="primary"
                key={props.postUnico.id}
                value={props.postUnico.id}
                style={AppCss.Painel}
                eventKey={1} >
                <HeaderPost post={props.postUnico} />
                <div style={{ textAlign: 'justify' }}><p> {props.postUnico.body}</p> </div>
                <div style={{ marginTop: '20px' }}>
                    <Link to='#'>
                        <BotaoEditar size={'40px'} 
                        onClick={() => props.abrirModal()}/>
                    </Link>
                    <Link className="close-search" to="/">
                        <IconTrash
                            size={'40px'}
                            onClick={() => props.deletPost(props.posts, props.postUnico.id)}
                            style={{ color: 'red', marginLeft: '30px' }} />
                    </Link>
                </div>
                <div className='votacao' style={{ textAlign: 'right' }}>
                    <Link to='#'>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus("+3")}>
                            <Heart
                                className='Loved'
                                onClick={() => props.votePost(props.postUnico.id, "loved", props.posts)}
                                size={'20px'}
                                style={{ color: 'red' }} />
                        </OverlayTrigger>
                    </Link>
                    <Link to='#'>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus("+1")}>
                            <Like
                                onClick={() => props.votePost(props.postUnico.id, "upVote", props.posts)}
                                size={'20px'}
                                style={{ margin: '15px' }} />
                        </OverlayTrigger>
                    </Link>
                    <Link to='#'>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus("-1")}>
                            <NotLike
                                onClick={() => props.votePost(props.postUnico.id, "downVote", props.posts)}
                                size={'20px'} />
                        </OverlayTrigger>
                    </Link>
                </div>
            </Panel>
            {props.loading ?
                <div style={PostsCss.mensagem}>Loading...</div>
                :
                <div style={AppCss.postagens}>
                    <Button onClick={() => props.open()}>
                        Comentários
                    </Button>
                    <Panel collapsible expanded={props.show} >
                        <Comments 
                            comentarios={props.comentarios.sort(sortBy('voteScore')).reverse()} 
                            popoverHoverFocus={popoverHoverFocus} 
                            parentId={props.postUnico.id} 
                            style={ {position:'absolute'} }/>
                    </Panel>
                </div>
            }
        </div>
    )
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(FullPost);