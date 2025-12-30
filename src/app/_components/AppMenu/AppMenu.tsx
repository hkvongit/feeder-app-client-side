import Link from "next/link";
import styles from "./AppMenu.module.css"
import { BRAND } from "@/constants";

interface NavItem {
    label: string;
    link: string;
    status: 'ENABLED' | 'DISABLED'
}

class NavLink {
    label: string;
    link: string;
    status: 'ENABLED' | 'DISABLED';
    constructor(label: string, link: string, status: 'ENABLED' | 'DISABLED') {
        this.label = label;
        this.link = link
        this.status = status
    }
    get(): NavItem {
        return {
            label: this.label, link: this.link, status: this.status
        }
    }
}
const feedSources = new NavLink('Feed sources', "#", "ENABLED");
const favoriteSources = new NavLink('Favorite sources', "#", "ENABLED");
const savedFeeds = new NavLink('Saved feeds', "#", "ENABLED");
const tags = new NavLink('Tags', "#", "ENABLED");

const navlinks = [
    feedSources.get(),
    favoriteSources.get(),
    savedFeeds.get(),
    tags.get(),
]



// Main React Function
export default function AppMenu() {
    return (
        <nav className={styles.app_nav}>
            <div className={styles.brand_container}>
                <p className={styles.brand_name}>{BRAND.APP_NAME}</p>
                <p className={styles.brand_tagline} > {BRAND.TAGLINE}</p>
            </div>
            {
                navlinks.map((item: NavItem) => (
                    <Link className={styles.nav_link} key={item.label} href={item.link} prefetch={false}>{item.label}</Link>
                ))
            }
        </nav >
    )
}