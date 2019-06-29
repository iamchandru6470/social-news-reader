const feed =
  'Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile';

function getSubStr(str, start, end) {
  return str.substring(start, end);
}

// User class to store user information like name, type of social media and url.
class User {
  constructor(name, type) {
    this.type = type || 'twitter';
    this.name = this.prepareName(name);
    this.url = this.prepareUrl(this.type, this.name);
  }

  prepareName(name) {
    return getSubStr(name, 1, name.length);
  }

  prepareUrl(type, uname) {
    // Can extend further for various social media types
    if (type === 'twitter') {
      const url = 'https://twitter.com/' + this.name;
      return url;
    }
    return 'https://bit.ly';
  }
}

// Link class to create instance with text and href attribure
class Link {
  constructor(text, href) {
    this.text = text;
    this.href = href;
  }
}

// Entity class used for special treatment to text fields.
class Entity {
  constructor(tag, value) {
    this.tag = tag;
    this.value = value;
  }
}

// User feed class to perform formatting the user feed.
class UserFeed {
  constructor(user, feed) {
    this.feed = feed;
    this.users = [user];
    this.links = [];
    this.entities = [];
  }

  addEntities(entity) {
    this.entities.push(entity);
  }

  addLinks(link) {
    this.links.push(link);
  }

  addUsers(user) {
    this.users.push(user);
  }

  getLink(linkStr) {
    let link = null;
    for (let i = 0; i < this.links.length; i++) {
      if (linkStr === this.links[i].text) {
        link = this.links[i];
        break;
      }
    }
    return link;
  }

  getEntity(entityStr) {
    let entity = null;
    for (let i = 0; i < this.entities.length; i++) {
      if (entityStr === this.entities[i].value) {
        entity = this.entities[i];
        break;
      }
    }
    return entity;
  }

  getUser(userStr) {
    let user = null;
    for (let i = 0; i < this.users.length; i++) {
      if (userStr.includes(this.users[i].name)) {
        user = this.users[i];
        break;
      }
    }
    return user;
  }

  // Module 3 code used for formatting the feed.
  formatUserFeed() {
    const feedArr = this.feed.split(' ');
    var div = document.createElement('div');
    var para = document.createElement('p');
    for (let f = 0; f < feedArr.length; f++) {
      const space = document.createTextNode('\u00A0');
      const entity = this.getEntity(feedArr[f]);
      if (entity != null) {
        const entityTag = document.createElement(entity.tag);
        const entityStr = document.createTextNode(entity.value);
        entityTag.appendChild(entityStr);
        para.appendChild(entityTag);
        para.appendChild(space);
        continue;
      }
      const link = this.getLink(feedArr[f]);
      if (link != null) {
        const linkTag = document.createElement('A');
        const linkStr = document.createTextNode(link.text);
        linkTag.setAttribute('href', link.href);
        linkTag.appendChild(linkStr);
        para.appendChild(linkTag);
        para.appendChild(space);
        continue;
      }
      if (feedArr[f][0] === '@') {
        const user = this.getUser(feedArr[f]);
        console.log(user);
        if (user != null) {
          const atSym = document.createTextNode('@');
          const usrLinkTag = document.createElement('A');
          const usrLinkStr = document.createTextNode(user.name);
          usrLinkTag.setAttribute('href', user.url);
          usrLinkTag.appendChild(usrLinkStr);
          para.appendChild(atSym);
          para.appendChild(usrLinkTag);
        } else {
          const someTextNode = document.createTextNode(feedArr[f]);
          para.appendChild(someTextNode);
        }
        para.appendChild(space);
        continue;
      }

      const textNode = document.createTextNode(feedArr[f]);
      para.appendChild(textNode);
      para.appendChild(space);
    }
    div.appendChild(para);
    document.body.appendChild(div);
  }
}

const username = getSubStr(feed, 55, 67);
const user = new User(username);

const userFeed = new UserFeed(user, feed);

const linkSubstr = getSubStr(feed, 37, 54);
const link = new Link(linkSubstr, linkSubstr);
userFeed.addLinks(link);

const entity1 = new Entity('strong', getSubStr(feed, 14, 22));
userFeed.addEntities(entity1);

const entity2 = new Entity('strong', getSubStr(feed, 0, 5));
userFeed.addEntities(entity2);

// In future if we want to add hashtag's then create instance of Link and use addLinks method to add links.
// Find the code below to add hashtags
// userFeed.addLinks(new Link('mypage', 'https://bit.ly/abb')) and make sure this is available in the feed (output from module 1)

// Formatting the feed for final output.
userFeed.formatUserFeed();
