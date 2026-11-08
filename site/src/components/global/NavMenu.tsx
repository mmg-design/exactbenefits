import { useRef, useState, type CSSProperties } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

type NavLink = { href: string; label: string };

export type NavItem =
  | { label: string; href: string; links?: never }
  | { label: string; links: NavLink[]; href?: never };

interface Props {
  /** Top-level entries, in order. An entry with `links` opens a panel. */
  items: NavItem[];
  /** Path of the page being viewed, to mark its link. */
  currentPath?: string;
}

const clean = (path: string) => path.replace(/\/+$/, "");

/**
 * Desktop navigation on Radix: panels open on hover, and one shared panel
 * slides between triggers. Styles live in Nav.astro with the rest of the bar.
 */
export default function NavMenu({ items, currentPath = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const [value, setValue] = useState("");
  const [panelX, setPanelX] = useState(0);
  const [sliding, setSliding] = useState(false);

  const onValueChange = (next: string) => {
    /* Only slide between open panels, so the first one appears in place. */
    setSliding(value !== "" && next !== "");
    const trigger = triggers.current.get(next);
    if (trigger && root.current) {
      setPanelX(
        trigger.getBoundingClientRect().left -
          root.current.getBoundingClientRect().left,
      );
    }
    setValue(next);
  };

  const isCurrent = (href: string) => clean(currentPath) === clean(href);

  return (
    <NavigationMenu.Root
      asChild
      value={value}
      onValueChange={onValueChange}
      delayDuration={80}
      aria-label={undefined}
    >
      <div
        ref={root}
        className="nav-menu_wrap"
        data-sliding={sliding || undefined}
        style={{ "--_panel-x": `${panelX}px` } as CSSProperties}
      >
        <NavigationMenu.List className="nav-menu_list">
          {items.map((item) =>
            item.links ? (
              <NavigationMenu.Item key={item.label} value={item.label}>
                <NavigationMenu.Trigger
                  className="nav-menu_trigger"
                  ref={(node) => {
                    if (node) triggers.current.set(item.label, node);
                  }}
                >
                  {item.label}
                  <svg
                    className="nav-menu_arrow"
                    viewBox="0 0 66 70"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M17 2L50 34.9999L17 68"
                      stroke="currentColor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="nav-menu_content">
                  <ul className="nav_sublinks">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <NavigationMenu.Link
                          className="nav_link"
                          href={link.href}
                          active={isCurrent(link.href)}
                        >
                          {link.label}
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={item.label}>
                <NavigationMenu.Link
                  className="nav_link"
                  href={item.href}
                  active={isCurrent(item.href)}
                >
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ),
          )}
        </NavigationMenu.List>
        <div className="nav-menu_position">
          <NavigationMenu.Viewport className="nav-menu_viewport" />
        </div>
      </div>
    </NavigationMenu.Root>
  );
}
