import { Component, createRef } from 'react'
import { HomeHeader } from '../cmps/HomeHeader'
import heroImg1 from '../assets/imgs/svg/hero-home.svg'
import heroImg2 from '../assets/imgs/svg/hero-home2.svg'
import heroImg3 from '../assets/imgs/svg/hero-home3.svg'

export class HomePage extends Component {
    constructor(props) {
        super(props)
        this.myRef = createRef()
        this.state = { scrollTop: 0 }
    }

    handeScroll = () => {
        const scrollTop = this.myRef.current.scrollTop
        this.setState({ scrollTop: scrollTop })
    }

    render() {
        return (
            <section
                onScroll={this.handeScroll}
                ref={this.myRef}
                className="home-page">

                <HomeHeader scroll={this.state.scrollTop} />

                <div className="home-layout">
                    <div
                        className="home-details one flex justify-center">
                        <section className="hero-details">
                            <h3 className="hero-title">Work Without Limits</h3>
                            <blockquote className="block-quote">“
                                Easily build, run, and scale your dream workflows on one platform.
                                What would you like to manage with DOmingo?”&nbsp;</blockquote>
                        </section>
                        <img src={heroImg1} alt="heroImg" className="hero-img" />
                    </div>
                    <div className="home-details two flex justify-center">
                        <img src={heroImg2} alt="heroImg" className="hero-img" />
                        <section className="hero-details">
                            <h3 className="hero-title">Easy managing </h3>
                            <blockquote className="block-quote">“Manage everything
                                in one workspace
                                Planning, tracking and delivering your team’s best work has never been easier.”&nbsp;</blockquote>
                        </section>
                    </div>
                    <div className="home-details three flex justify-center">
                        <section className="hero-details">
                            <h3 className="hero-title">No learning curve required</h3>
                            <blockquote className="block-quote">“Set up in minutes
                                Get started fast with hundreds of visual and customizable templates - or create your own.”&nbsp;</blockquote>
                        </section>
                        <img src={heroImg3} alt="heroImg" className="hero-img" />
                    </div>
                </div>
            </section>
        )
    }
}
