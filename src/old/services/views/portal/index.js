import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../containers/layout';
import Pokemon from '../../components/pokemon';

import { Carousel } from 'antd';

class Portal extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    getStyles() {
        return {};
    }

    componentDidMount () {
        //------------------
        let canvas = document.getElementById("intrusion");
        let ctx = canvas.getContext("2d");
        let grd = null;
        let t = null;
        let requestId = null;

        let cw = (canvas.width = 500),
        cx = cw / 2;

        let ch = (canvas.height = 500),
        cy = ch / 2;

        let m = {
            x: 0,
            y: 0
        };

        let target = {
            x: 0,
            y: 0
        };

        let speed = 0.0005;
        let easing = 0.90;

        let frames = 0;

        let balls = [];
        let vp = {
            x: cx,
            y: cy
        };

        let fl = 250;

        function Ball(R) {
            this.R = R;
            this.r = .04 * this.R;

            this.pos = spherePointPicking(this.R)
            this.x = this.pos.x + cx;
            this.y = this.pos.y + cy;
            this.a = {
                x: 0,
                y: 0
            };
            this.scale = {
                x: 1,
                y: 1
            };

            this.c = oGrd(this.r / 2, 210);

            this.rotateX = function(angle) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var y1 = this.pos.y * cos - this.pos.z * sin;
                var z1 = this.pos.z * cos + this.pos.y * sin;

                this.pos.y = y1;
                this.pos.z = z1;
            };

            this.rotateY = function(angle) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var x1 = this.pos.x * cos - this.pos.z * sin;
                var z1 = this.pos.z * cos + this.pos.x * sin;

                this.pos.x = x1;
                this.pos.z = z1;
            };

            this.draw3D = function() {
                if (this.pos.z > -fl) {
                    var scale = fl / (fl - this.pos.z);

                    this.scale = {
                        x: scale,
                        y: scale
                    };
                    this.x = vp.x + this.pos.x * scale;
                    this.y = vp.y + this.pos.y * scale;
                    this.visible = true;
                } else {
                    this.visible = false;
                }
            };

            this.draw2D = function() {

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.scale(this.scale.x, this.scale.y);
                ctx.beginPath();
                ctx.fillStyle = this.c;
                ctx.fillRect(0, 0, this.r, this.r);
                ctx.restore();
            };
        }

        for (var i = 0; i < 1000; i++) {
            balls.push(new Ball(150));
            balls.push(new Ball(75));
        }

        function Draw() {
            t = new Date().getTime() / 127;

            ctx.clearRect(0, 0, cw, ch);

            frames += .1;
            m.x = cx + Math.cos(t / 43 + Math.cos(t / 47 + frames)) * 8;
            m.y = cy + Math.sin(t / 31 + Math.cos(t / 37 + frames)) * 8;

            target.x = (m.y - vp.y) * speed;
            target.y = (m.x - vp.x) * speed;

            balls.map(function(b) {
                b.draw3D();
            });

            balls.sort(function(a, b) {
                return a.pos.z - b.pos.z;
            });

            target.x *= easing;
            target.y *= easing;

            balls.map(function(b) {
                b.rotateX(target.x);
                b.rotateY(target.y);
                if (b.visible) {
                    b.draw2D();
                }
            });

            requestId = window.requestAnimationFrame(Draw);
        }

        Draw();

        function oGrd(r, h) {
            grd = ctx.createRadialGradient(r, r, 0, r, r, r);

            grd.addColorStop(0, "hsla(" + h + ",95%,95%, 1)");
            grd.addColorStop(0.4, "hsla(" + h + ",95%,45%,.5)");
            grd.addColorStop(1, "hsla(" + h + ", 95%, 45%, 0)");

            return grd;
        }

        function spherePointPicking (R) {
            var u1 = Math.random();
            var u2 = Math.random();
            var s = Math.acos(2 * u1 - 1) - Math.PI / 2;
            var t = 2 * Math.PI * u2;

            return {
                x: R * Math.cos(s) * Math.cos(t),
                y: R * Math.cos(s) * Math.sin(t),
                z: R * Math.sin(s)
            };
        }        
    }

    render() {
        const styles = this.getStyles();

        return (
            <div className="view view-intrusion">
                <Layout>
                    <Carousel vertical="true" autoplay>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                    <Row gutter={20} style={{marginTop: 30}}>
                        <Col span={6} offset={3}>
                            <Card title="扫描" extra={<Link to="/services/scan">进入</Link>} style={{ width: 300 }}>
                                <div className="cube-wrapper">
                                    <div className="cube">
                                        <div className="white"></div>
                                        <div className="light"></div>
                                        <div className="dark"></div>
                                    </div>
                                </div>                                
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="爬虫" extra={<Link to="/services/spider">进入</Link>} style={{ width: 300 }}>
                                <div className="atom-wrapper">
                                    <div className="atom">
                                        <div className="atom_particle">
                                            <svg>
                                                <circle cx="100" cy="100" fill="none" r="80" strokeWidth="5"></circle>
                                            </svg>
                                        </div>
                                        <div className="atom_particle">
                                            <svg>
                                                <circle cx="100" cy="100" fill="none" r="80" strokeWidth="5"></circle>
                                            </svg>
                                        </div>
                                        <div className="atom_particle">
                                            <svg>
                                                <circle cx="100" cy="100" fill="none" r="80" strokeWidth="5"></circle>
                                            </svg>
                                        </div>
                                        <div className="atom_particle">
                                            <svg>
                                                <circle cx="100" cy="100" fill="none" r="80" strokeWidth="5"></circle>
                                            </svg>
                                        </div>
                                    </div>        
                                </div>                        
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="intrusion-wrapper" title="入侵" extra={<Link to="/services/intrusion">进入</Link>} style={{ width: 300 }}>
                                <canvas className="intrusion" id="intrusion"></canvas>
                            </Card>
                        </Col>                                        
                    </Row>
                    <Pokemon></Pokemon>
                </Layout>
            </div>
        );
    }
}

export default connect(state => ({

}))(Portal);


