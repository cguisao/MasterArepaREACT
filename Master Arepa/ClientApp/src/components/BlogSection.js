import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

class BlogSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BlogList: [{
                "date": "01 Jan 2019",
                "image_src": "images/blog/img-1.jpg",
                "designation": "ui/ux designer",
                "title": "Quis autem reprehenderit",
                "content": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis deleniti corrupti.",
            },
            {
                "date": "02 Jan 2019",
                "image_src": "images/blog/img-2.jpg",
                "designation": "WEB DEVELOPER",
                "title": "At vero eos accusamus",
                "content": "Et harum quidem rerum it facilis est et expedita distinctio a libero tempore cumsoluta.",
            },
            {
                "date": "03 Jan 2019",
                "image_src": "images/blog/img-3.jpg",
                "designation": "WEB DEVELOPER",
                "title": "Et harum quidem rerum",
                "content": "Temporibus autemes quibusdam et aut offici debitis rerum necessitatibus recusandae.",
            },
            ]
        };
    }

    render() {

        return (
            <React.Fragment>
                <section className="section" id="blog">
                    <div className="container">
                        <Row>
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">The Blog</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>

                        <div className="row">

                            {this.state.BlogList.map((blog, index)=> {
                                return <Col lg="4" key={index}>
                                    <div className="blog position-relative">
                                        <div className="blog-img position-relative mt-4">
                                            <div className="blog-date">
                                                <p className="mb-0 font-weight-light text-white f-15">{blog.date}</p>
                                            </div>
                                            <img src={blog.image_src} alt="" className="img-fluid mx-auto d-block rounded" />
                                        </div>
                                        <div className="position-relative">
                                            <div className="blog-content text-center bg-white p-4">
                                                <p className="text-uppercase f-13 mb-2 text-muted">{blog.designation}</p>
                                                <h5 className="font-weight-normal f-18"><Link to="#" className="text-dark">{blog.title}</Link></h5>
                                                <p className="text-muted f-14">
                                                    {blog.content}</p>
                                                <div className="read-more">
                                                    <Link to="#" className=" text-primary f-15">Read more<i className="mdi mdi-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            })}

                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default BlogSection;