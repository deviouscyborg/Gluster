import { Component, OnInit } from '@angular/core';
import {SearchBar} from 'tns-core-modules/ui/search-bar';
import {isAndroid, isIOS} from 'tns-core-modules/platform';

declare const IQKeyboardManager: any;

interface DataItem {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

interface Source {
    id: string;
    name: string;
}


@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    // TIP: change this array to hit the newsapi.org feed for live data!
    // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=<YOUR API KEY>

    allNews: DataItem[] = [{ "source": { "id": null, "name": "Yahoo.com" }, "author": null, "title": "The Latest: Russia says no evidence of gas attack in Douma", "description": null, "url": "https://www.yahoo.com/news/latest-turkey-urges-sides-avoid-more-syria-turmoil-113652213.html", "urlToImage": null, "publishedAt": "2018-04-13T19:44:00Z" }, { "source": { "id": "the-washington-post", "name": "The Washington Post" }, "author": "http://www.facebook.com/matt.zapotosky", "title": "Trump issues pardon to 'Scooter' Libby, former chief of staff to Vice President Cheney", "description": "The Bush administration aide was convicted of perjury before a grand jury, lying to FBI investigators and obstruction of justice.", "url": "https://www.washingtonpost.com/politics/trump-issues-pardon-to-scooter-libby-former-chief-of-staff-to-vice-president-cheney/2018/04/13/dfa4039a-3f2d-11e8-8d53-eba0ed2371cc_story.html", "urlToImage": "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2018/04/13/National-Politics/Images/AFP_13Z4QQ.jpg?t=20170517", "publishedAt": "2018-04-13T19:06:25Z" }, { "source": { "id": "the-new-york-times", "name": "The New York Times" }, "author": "", "title": "Where's the Boom in Bank Lending?: DealBook Briefing", "description": "Bank lending was expected to surge this year. But going by bank results so far, lending in the first quarter is set to disappoint.", "url": "https://www.nytimes.com/2018/04/13/business/dealbook/trump-trans-pacific-partnership.html", "urlToImage": "https://static01.nyt.com/images/2018/02/03/us/14db-newsletter-wells/14db-newsletter-wells-facebookJumbo-v2.jpg", "publishedAt": "2018-04-13T18:56:00Z" }, { "source": { "id": null, "name": "Cbssports.com" }, "author": "", "title": "Dallas Cowboys release Dez Bryant: A timeline of the wide receiver's career", "description": "A look back at the journey that led to Bryant's unceremonious departure from Dallas", "url": "https://www.cbssports.com/nfl/news/dallas-cowboys-release-dez-bryant-a-timeline-of-the-wide-receivers-career/", "urlToImage": "https://sportshub.cbsistatic.com/i/r/2017/10/05/3534c48d-75c3-46c3-8109-1a40f4bb3ef4/thumbnail/770x433/43641559d7896478a232fe7e312e4aad/dez-bryant.png", "publishedAt": "2018-04-13T18:42:00Z" }, { "source": { "id": "the-new-york-times", "name": "The New York Times" }, "author": "Adam Goldman and Nicholas Fandos", "title": "Former FBI Deputy Director Is Faulted in Scathing Inspector General Report", "description": "The report accused the former official, Andrew G. McCabe, of repeatedly misleading investigators. Mr. McCabe was fired in March hours before he was eligible for a full pension.", "url": "https://www.nytimes.com/2018/04/13/us/politics/former-fbi-deputy-director-is-faulted-in-scathing-inspector-general-report.html", "urlToImage": "https://static01.nyt.com/images/2018/04/14/us/politics/14dc-mccabe/14dc-mccabe-facebookJumbo.jpg", "publishedAt": "2018-04-13T18:19:29Z" }, { "source": { "id": "abc-news", "name": "ABC News" }, "author": "ABC News", "title": "What we know about trapped teen's mysterious death inside a van after his 2 calls to 911", "description": "Cincinnati police and prosecutors have launched investigations after a teenager was mysteriously found dead in his van hours after calling 911 with pleas for help.", "url": "http://abcnews.go.com/US/trapped-teens-mysterious-death-inside-van-calls-911/story?id=54441873", "urlToImage": "https://s.abcnews.com/images/US/car-death-3-us-er-180412.jpg_hpMain_16x9_992.jpg", "publishedAt": "2018-04-13T18:11:50Z" }, { "source": { "id": "usa-today", "name": "USA Today" }, "author": "Erin Jensen", "title": "Reports: Will Ferrell involved in car accident", "description": "The actor was a passenger in a car that was involved in a two-car collision, Thursday night, according to reports.", "url": "https://www.usatoday.com/story/life/people/2018/04/13/ferrell-accident-car-crash/514611002/", "urlToImage": "https://www.gannett-cdn.com/-mm-/378e813cc73a4d15c8bc7458f868ffbeb0a0dc47/c=0-239-2310-1544&r=x1683&c=3200x1680/local/-/media/2018/04/13/USATODAY/USATODAY/636592163419387820-875062214-95377695.JPG", "publishedAt": "2018-04-13T18:01:11Z" }, { "source": { "id": "the-washington-post", "name": "The Washington Post" }, "author": "https://www.facebook.com/TomJackmanWP/", "title": "Backpage CEO Carl Ferrer pleads guilty in three states, agrees to testify against other website officials", "description": "Ferrer quietly entered a plea in Arizona last week, then went to courts in Texas and California this week to admit laundering money and facilitating prostitution on the website.", "url": "https://www.washingtonpost.com/news/true-crime/wp/2018/04/13/backpage-ceo-carl-ferrer-pleads-guilty-in-three-states-agrees-to-testify-against-other-website-officials/", "urlToImage": "https://www.washingtonpost.com/resizer/Ykenpm8M6SGvhFlTJb44edCy6Ec=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/36S53GFHOA74ZIS3MJYLFEQCVI.jpg", "publishedAt": "2018-04-13T17:53:37Z" }, { "source": { "id": "the-hill", "name": "The Hill" }, "author": "Scott Wong", "title": "Republicans express doubts that Ryan can stay on as Speaker", "description": "Speculation is growing on Capitol Hill that Paul Ryan may need to relinquish his Speaker’s gavel soon, though few Republicans are publicly calling on him to resign.", "url": "http://thehill.com/homenews/house/383051-republicans-express-doubts-that-ryan-can-stay-on-as-speaker", "urlToImage": "http://thehill.com/sites/default/files/ryanpaul_041218gn10_lead.jpg", "publishedAt": "2018-04-13T17:51:00Z" }, { "source": { "id": null, "name": "Espn.com" }, "author": null, "title": "Larry Nassar victim accuses MSU interim president of offering secret payoff", "description": "A sexual assault victim of Larry Nassar says Michigan State interim president John Engler offered her a secret payoff to settle a lawsuit.", "url": "http://www.espn.com/college-sports/story/_/id/23154441/victim-larry-nassar-accuses-michigan-state-interim-president-john-engler-offering-payoff", "urlToImage": "http://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F0130%2Fr321301_1296x729_16%2D9.jpg", "publishedAt": "2018-04-13T17:38:24Z" }, { "source": { "id": "the-wall-street-journal", "name": "The Wall Street Journal" }, "author": null, "title": "Trump Lawyer Michael Cohen Negotiated $1.6 Million Settlement for Top Republican Fundraiser", "description": null, "url": "https://www.wsj.com/articles/trump-lawyer-michael-cohen-negotiated-1-6-million-settlement-for-top-republican-fundraiser-1523638726", "urlToImage": null, "publishedAt": "2018-04-13T17:33:50Z" }, { "source": { "id": "the-washington-post", "name": "The Washington Post" }, "author": null, "title": "Trump, Gardner strike deal on legalized marijuana, ending standoff over Justice nominees", "description": "Colorado Sen. Cory Gardner previously said he would block all DOJ nominations because of a potential federal crackdown on states that have legalized marijuana.", "url": "https://www.washingtonpost.com/politics/trump-gardner-strike-deal-on-legalized-marijuana-ending-standoff-over-justice-nominees/2018/04/13/2ac3b35a-3f3a-11e8-912d-16c9e9b37800_story.html", "urlToImage": "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2018/01/05/National-Politics/Images/Botsford171205Trump22675.JPG?t=20170517", "publishedAt": "2018-04-13T17:19:50Z" }, { "source": { "id": null, "name": "Nydailynews.com" }, "author": "David Boroff", "title": "Black teen gets shot at after missing bus and asking for directions: 'I turned back and saw him aiming at me'", "description": "A black teen in Michigan stopped to ask for directions after missing his school bus — and a local resident responded by shooting at him.", "url": "http://www.nydailynews.com/news/crime/black-teen-shot-stopping-directions-article-1.3932077", "urlToImage": "http://assets.nydailynews.com/polopoly_fs/1.3932076.1523633380!/img/httpImage/image.jpg_gen/derivatives/landscape_1200/brennan14n-1-web.jpg", "publishedAt": "2018-04-13T16:36:38Z" }, { "source": { "id": "the-new-york-times", "name": "The New York Times" }, "author": "Christine Hauser", "title": "California Rescuers Find Items Belonging to Missing Family", "description": "Four family members were reported missing during a road trip, after a car was seen going into a swollen river. Relatives in India pleaded for help.", "url": "https://www.nytimes.com/2018/04/13/us/california-missing-family-india.html", "urlToImage": "https://static01.nyt.com/images/2018/04/13/us/13xp-crash-sub/13xp-crash-sub-facebookJumbo.jpg", "publishedAt": "2018-04-13T16:24:33Z" }, { "source": { "id": null, "name": "Nola.com" }, "author": "Jennifer Larino", "title": "Here's when severe storms, rain are expected to hit New Orleans", "description": "The National Weather Service has issued a flash flood watch for the New Orleans area starting late Friday (April 13).", "url": "http://www.nola.com/weather/index.ssf/2018/04/rain_new_orleans_french_quarte.html", "urlToImage": "http://image.nola.com/home/nola-media/width620/img/weather_impact/photo/24364951-standard.jpg", "publishedAt": "2018-04-13T16:02:46Z" }, { "source": { "id": "fox-news", "name": "Fox News" }, "author": "Greg Norman", "title": "North Carolina incest father told mother he killed daughter-wife and their child in shocking 911 call", "description": "The North Carolina incest dad, whose Thursday murder spree took the lives of the biological daughter he married and the infant child he fathered with the girl, reportedly explained his possible motive to his own mother in a stunning phone call moments before …", "url": "http://www.foxnews.com/us/2018/04/13/north-carolina-incest-father-told-mother-killed-daughter-wife-and-their-child-in-shocking-911-call.html", "urlToImage": "http://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2018/04/13/0/0/694940094001_5769790038001_5769786320001-vs.jpg?ve=1", "publishedAt": "2018-04-13T15:11:15Z" }, { "source": { "id": "cnn", "name": "CNN" }, "author": "Chris Cillizza, CNN Editor-at-large", "title": "The 11 most eye-opening lines in James Comey's 'A Higher Loyalty,' ranked", "description": "Days before its official release, excerpts of James Comey's memoir about his time as FBI Director under President Donald Trump have leaked. Actually, flooded.", "url": "https://www.cnn.com/2018/04/13/politics/comey-book-trump/index.html", "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/180413091217-01-trump-comey-handshake-file-super-tease.jpg", "publishedAt": "2018-04-13T15:03:09Z" }, { "source": { "id": null, "name": "Nbcsports.com" }, "author": "Michael David Smith", "title": "Seahawks sign Stephen Morris", "description": "The Seahawks are signing a backup quarterback, one who has presumably agreed to stand for the national anthem. Seattle has signed quarterback Stephen Morris, Adam Schefter of ESPN reports. That news will stoke the controversy regarding the Seahawks’ dealings …", "url": "http://profootballtalk.nbcsports.com/2018/04/13/seahawks-sign-stephen-morris/", "urlToImage": "https://nbcprofootballtalk.files.wordpress.com/2018/04/gettyimages-8396753241-e1523616089736.jpg", "publishedAt": "2018-04-13T10:42:30Z" }, { "source": { "id": "politico", "name": "Politico" }, "author": "NATASHA KORECKI", "title": "Illinois GOP governor calls for Missouri GOP governor to resign", "description": "Illinois Gov. Bruce Rauner’s resignation call is particularly stinging considering that Missouri Gov. Eric Greitens appeared in an ad for Rauner's reelection campaign.", "url": "https://www.politico.com/story/2018/04/12/rauner-greitens-resignation-call-520858", "urlToImage": "https://static.politico.com/95/bc/e7bc685a4b8d8c48feceb0dfc505/gov-bruce-rauner.%20Bruce%20Rauner.png", "publishedAt": "2018-04-13T00:12:03Z" }];

    searching = false;

    news: DataItem[];

    actionAndroid;

    constructor() {
        this.actionAndroid = isAndroid;

        this.news = this.allNews.filter((e) => {
            return e.urlToImage && e.title && e.description && e.source.name;
        });

        if (isIOS) {
            var keyboard = IQKeyboardManager.sharedManager();
            keyboard.shouldResignOnTouchOutside = true;
        }
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
        searchBar.dismissSoftInput();
    }

    onSearch(searchValue) {
        if (searchValue !== "") {
            this.news = this.allNews.filter((e) => {
                return (e.urlToImage && e.title && e.description && e.source.name) &&
                    (e.description.toLowerCase().includes(searchValue) || e.title.toLowerCase().includes(searchValue));
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a news and press enter";
        this.allNews.forEach(item => {
            this.news.push(item);
        });
        searchBar.dismissSoftInput();
        this.searching = false;
    }

    public onTextChange(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }

    ngOnInit(): void { }
}
