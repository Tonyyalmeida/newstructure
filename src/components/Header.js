import React from 'react';

export const Header = props => (<div>
<section className="hero is-medium is-primary is-bold">
<div className="hero-body">
  <div className="container has-text-centered">
    <h1 className="title is-1">
      Topico
    </h1>
    <h2 className="subtitle">
      Just another Flashcard app - made to make studying easier!
    </h2>
  </div>
</div>
</section>
<div className="box has-text-centered">    <p className="subtitle">
    Studying Flashcards is already challenging enough - we don't need complex and bloated apps to do so.
    </p></div>
    <section className="section">
    <div className="columns is-mobile is-centered">
    <div className="column is-3">
    <div className="container is-fluid has-text-centered"> 
<p className="title">Start now!</p>
<div className="buttons">
<a className="button is-large is-primary" href="/login">Login</a>
<a className="button is-large is-info" href="/signup">Signup</a>
    </div>    </div></div>
  </div></section>
  
</div>)

export default Header