import React from 'react';

// const Footer = props => <footer id="footer">
// <FooterFirstSection/>
// <FooterSecondSection/>
// <p className="copyright">&copy; 2018 - Made in Saigon</p>
// </footer>


const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          Built on <strong>React</strong> with <strong>Express, MobX and Bulma</strong> in Saigon <a href="https://github.com/aaronklaser">Aaron Klaser</a>
          <br />
          Copyright 2018
        </p>
      </div>
    </div>
  </footer>
)

const FooterFirstSection = props =>              <section>
<h2>About Us</h2>
<p>Part of Nam A Bank <br/> built by <a href="https://twitter.com/namn0mn0m">@namn0mn0m</a></p> 
<ul className="actions">
  <li><a href="generic.html" className="button">Learn More</a></li>
</ul>
</section>

const FooterSecondSection = props =>               <section>
<h2>Contact</h2>
<dl className="alt">
  <dt>Address</dt>
  <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
  <dt>Phone</dt>
  <dd>(000) 000-0000 x 0000</dd>
  <dt>Email</dt>
  <dd><a href="#">information@untitled.tld</a></dd>
</dl>
<ul className="icons">
  <li><a href="#" className="icon fa-twitter alt"><span className="label">Twitter</span></a></li>
  <li><a href="#" className="icon fa-facebook alt"><span className="label">Facebook</span></a></li>
  <li><a href="#" className="icon fa-instagram alt"><span className="label">Instagram</span></a></li>
</ul>
</section>

export default Footer