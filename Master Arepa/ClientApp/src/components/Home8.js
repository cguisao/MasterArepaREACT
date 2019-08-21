import React from 'react';
import Video from './Video';
import 'react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';
import ReactTextRotator from 'react-text-rotator';




class Home8 extends React.Component {

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.setState({ isOpen: true })
  }

  componentDidMount() {
    document.getElementById("main_navbar").classList.add("navbar-light");
  }


  render() {
    const content = [
      {
        text: 'We Make Beautiful Things',
        className: 'classA',
        animation: 'fade',
      },
      {
        text: 'We Make Beautiful Things',
        className: 'classB',
        animation: 'fade',
      },
      {
        text: 'We Make Beautiful Things',
        className: 'classC',
        animation: 'fade',
      }
    ];
    


    return (
      <React.Fragment>

        <section className="section home-8-bg" id="home">
          <Video />

          <div className="home-center">
            <div className="home-desc-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="mt-40 text-center home-8-content">


                      
                        <h1 className="text-white font-weight-light home-8-title mb-0">
                        <ReactTextRotator
                          content={content}
                          time={2000}
                          startDelay={1000}
                        />
                        </h1>

                                          
                                <p className="text-white-70 mt-4 f-15 mb-0">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis at suscipit laboriosam nisi ut aliquid a commodi consequatur Quis autem.</p>
                                <div className="home-8-content mt-5">
                                    <a  onClick={this.openModal} className="video-play-icon text-white"><i className="mdi mdi-play play-icon-circle text-white mr-2"></i> 
                                            <span>Watch The Video!</span>
                                        </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>

        <ModalVideo channel='youtube' isOpen={this.state.isOpen}  onClose={() => this.setState({ isOpen: false })} />


      </React.Fragment>
    );
  }
}
export default Home8;