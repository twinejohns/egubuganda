#!/usr/bin/env python3
"""Generate a WordPress WXR demo-content file for the EnvHub Uganda Blocks theme.

Output: envhub-demo-content.xml — import via Tools -> Import -> WordPress.
All markup is block-editor markup, so every page stays editable in the editor.
"""

from html import escape
from pathlib import Path
from datetime import datetime, timedelta
import json
import re
import sys

SITE = "https://envhub-ug.org"
IMG = "/wp-content/themes/envhub-blocks/assets/img"
AUTHOR = "envhub"

# ---------------------------------------------------------------- block helpers


def h(text, level=2, align="wide"):
    a = f' {{"align":"{align}"}}' if align else ""
    cls = " alignwide" if align == "wide" else ""
    return (
        f"<!-- wp:heading {{\"level\":{level}{',\"align\":\"wide\"' if align else ''}}} -->\n"
        f'<h{level} class="wp-block-heading{cls}">{escape(text)}</h{level}>\n'
        f"<!-- /wp:heading -->"
    )


def p(text, extra_class=None):
    if extra_class:
        return (
            f'<!-- wp:paragraph {{"className":"{extra_class}"}} -->\n'
            f'<p class="{extra_class}">{text}</p>\n<!-- /wp:paragraph -->'
        )
    return f"<!-- wp:paragraph -->\n<p>{text}</p>\n<!-- /wp:paragraph -->"


def eyebrow(text):
    return (
        '<!-- wp:paragraph {"className":"is-style-envhub-eyebrow","textColor":"primary"} -->\n'
        f'<p class="is-style-envhub-eyebrow has-primary-color has-text-color">{escape(text)}</p>\n'
        "<!-- /wp:paragraph -->"
    )


def ul(items):
    lis = "\n".join(f"<!-- wp:list-item -->\n<li>{escape(i)}</li>\n<!-- /wp:list-item -->" for i in items)
    return f'<!-- wp:list -->\n<ul class="wp-block-list">\n{lis}\n</ul>\n<!-- /wp:list -->'


def group(inner, bg=None, align="full", padding="var:preset|spacing|60"):
    attrs = '{"align":"%s","style":{"spacing":{"padding":{"top":"%s","bottom":"%s"}}}%s}' % (
        align,
        padding,
        padding,
        f',"backgroundColor":"{bg}"' if bg else "",
    )
    bgcls = f" has-{bg}-background-color has-background" if bg else ""
    return (
        f"<!-- wp:group {attrs} -->\n"
        f'<div class="wp-block-group align{align}{bgcls}" style="padding-top:{padding.replace("var:preset|spacing|","var(--wp--preset--spacing--")+")" if padding.startswith("var:") else padding};'
        f'padding-bottom:{padding.replace("var:preset|spacing|","var(--wp--preset--spacing--")+")" if padding.startswith("var:") else padding}">\n'
        f'<!-- wp:group {{"align":"wide","layout":{{"type":"constrained"}}}} -->\n'
        f'<div class="wp-block-group alignwide">\n{inner}\n</div>\n<!-- /wp:group -->\n'
        f"</div>\n<!-- /wp:group -->"
    )


def card(inner, style="is-style-envhub-card"):
    return (
        f'<!-- wp:group {{"className":"{style}","layout":{{"type":"constrained"}}}} -->\n'
        f'<div class="wp-block-group {style}">\n{inner}\n</div>\n<!-- /wp:group -->'
    )


def columns(cols, count=None):
    inner = "\n".join(
        '<!-- wp:column -->\n<div class="wp-block-column">\n%s\n</div>\n<!-- /wp:column -->' % c
        for c in cols
    )
    return f'<!-- wp:columns {{"align":"wide"}} -->\n<div class="wp-block-columns alignwide">\n{inner}\n</div>\n<!-- /wp:columns -->'


def card_grid(items, per_row=3):
    """items: list of (title, body_html_lines)"""
    out = []
    for chunk_start in range(0, len(items), per_row):
        chunk = items[chunk_start : chunk_start + per_row]
        cols = []
        for title, body in chunk:
            inner = (
                f'<!-- wp:heading {{"level":3,"fontSize":"medium"}} -->\n'
                f'<h3 class="wp-block-heading has-medium-font-size">{escape(title)}</h3>\n<!-- /wp:heading -->\n'
                + body
            )
            cols.append(card(inner))
        while len(cols) < per_row:
            cols.append("")
        out.append(columns(cols))
    return "\n".join(out)


def heading_block(text, level=2):
    return (
        f'<!-- wp:heading {{"level":{level}}} -->\n'
        f'<h{level} class="wp-block-heading">{escape(text)}</h{level}>\n<!-- /wp:heading -->'
    )


def buttons(pairs):
    inner = "\n".join(
        '<!-- wp:button -->\n<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="%s">%s</a></div>\n<!-- /wp:button -->'
        % (url, escape(label))
        for label, url in pairs
    )
    return f'<!-- wp:buttons {{"layout":{{"type":"flex","justifyContent":"center"}}}} -->\n<div class="wp-block-buttons">\n{inner}\n</div>\n<!-- /wp:buttons -->'


def cover(img, title, text, btns):
    inner = (
        f'<!-- wp:heading {{"textAlign":"center","level":1,"style":{{"typography":{{"fontSize":"clamp(2rem,5vw,3.25rem)"}}}},"textColor":"base"}} -->\n'
        f'<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color" style="font-size:clamp(2rem,5vw,3.25rem)">{escape(title)}</h1>\n<!-- /wp:heading -->\n'
        f'<!-- wp:paragraph {{"align":"center","textColor":"base"}} -->\n'
        f'<p class="has-text-align-center has-base-color has-text-color">{escape(text)}</p>\n<!-- /wp:paragraph -->\n'
        + buttons(btns)
    )
    return (
        f'<!-- wp:cover {{"url":"{SITE}{IMG}/{img}","dimRatio":65,"overlayColor":"brand-dark","minHeight":72,"minHeightUnit":"vh","align":"full","layout":{{"type":"constrained"}}}} -->\n'
        f'<div class="wp-block-cover alignfull" style="min-height:72vh">'
        f'<span aria-hidden="true" class="wp-block-cover__background has-brand-dark-background-color has-background-dim-60 has-background-dim"></span>'
        f'<img class="wp-block-cover__image-background" alt="" src="{SITE}{IMG}/{img}" data-object-fit="cover"/>'
        f'<div class="wp-block-cover__inner-container">\n{inner}\n</div></div>\n<!-- /wp:cover -->'
    )


def sep():
    return '<!-- wp:spacer {"height":"var:preset|spacing|lg"} -->\n<div style="height:var(--wp--preset--spacing--lg)" aria-hidden="true" class="wp-block-spacer"></div>\n<!-- /wp:spacer -->'


# ---------------------------------------------------------------- page content

VALUES = [
    ("01 Transparency", "Open and accountable in all our actions and decisions."),
    ("02 Integrity", "Upholding honesty, ethics and consistency in our work."),
    ("03 Compassion", "Serving communities with empathy and care for people and nature."),
    ("04 Innovativeness", "Embracing creative, research-driven and practical solutions."),
    (
        "05 Inclusivity",
        "Ensuring equitable participation of youth, women, persons with disabilities and marginalised groups.",
    ),
]

ACTIVITIES = [
    (
        "Climate Mitigation & Adaptation",
        "Implementing climate-smart agricultural practices and promoting disaster-resilient community strategies to help communities adapt to and mitigate the impacts of climate change.",
        [
            "Climate-smart agriculture demonstration and training",
            "Disaster preparedness and community resilience planning",
            "Adaptation support for smallholder farming households",
        ],
    ),
    (
        "Conservation & Restoration",
        "Running tree-planting initiatives and ecosystem protection programmes that restore landscapes, protect biodiversity and strengthen community stewardship of natural resources.",
        [
            "Indigenous and fruit tree growing campaigns",
            "Degraded landscape and ecosystem restoration",
            "Community custodianship of natural resources",
        ],
    ),
    (
        "Environmental Education",
        "Leading advocacy and awareness programmes to build capacity and empower the next generation of environmental change agents through schools, universities and community outreach.",
        [
            "School and university outreach programmes",
            "Youth capacity-building workshops",
            "Community advocacy and awareness campaigns",
        ],
    ),
    (
        "Research & Innovation",
        "Acting as a platform for dialogue, innovation and evidence-based environmental policy — supporting research, knowledge generation and practical innovation for climate action and sustainable development.",
        [
            "Field research with academic partners",
            "Innovation boot camps and green enterprise mentorship",
            "Evidence for environmental policy dialogue",
        ],
    ),
]

STAFF = [
    ("Team Lead (Executive Director)", "Strategic leadership, organisational management, partnership development, resource mobilisation and overall programme oversight."),
    ("Finance and Administration Manager", "Financial management, budgeting, procurement, accounting, compliance, human resource administration and organisational operations."),
    ("Programs and Advocacy Manager", "Programme design and implementation, stakeholder engagement, policy advocacy, monitoring and evaluation, and project coordination."),
    ("Communications and Human Resource Manager", "Organisational communications, branding, public relations, staff welfare, recruitment and institutional communications."),
    ("Partnerships and Resource Mobilization Manager", "Strategic partnerships, donor engagement, fundraising, proposal development and institutional networking."),
    ("Media and Digital Communications Manager", "Digital communications, website management, media relations, content development and social media management."),
    ("Partnerships and Resource Mobilization Officer", "Supports partnership development, stakeholder engagement, proposal writing and donor relations."),
    ("Research and Innovations Officer", "Research coordination, innovation development, knowledge management, data analysis and technical support for evidence-based programming."),
]

MEMBERSHIP = [
    ("General Membership", "UGX 20,000", ["Basic access to environmental resources", "Access to events and community", "Membership certificate"]),
    ("Silver Membership", "UGX 50,000", ["Exclusive workshops", "Networking opportunities", "Priority access to selected programmes", "Membership certificate"]),
    ("Gold Membership", "UGX 150,000", ["Personalised consultations", "Advanced workshops", "Priority registration for major events", "Membership certificate and environmental pack"]),
    ("Platinum Membership", "UGX 500,000", ["VIP access to all events", "One-on-one expert sessions", "Recognition as a key supporter", "Membership certificate and environmental family pack"]),
]

FAQS = [
    ("What is Bricks Environment and Climate Hub Initiative Uganda (EHUG)?", "A youth-led non-governmental organisation based in Uganda, dedicated to environmental conservation, advocacy, capacity building, climate mitigation and adaptation, research, innovation and sustainable development."),
    ("What is the mission of Environmental Hub Uganda?", "To promote community involvement in creating a sustainable environment for generations."),
    ("What initiatives does EHUG undertake?", "Research and innovation, advocacy and environmental education programmes, tree planting, waste management programmes and sustainable development projects."),
    ("How can I get involved?", "Participate in our programmes, volunteer your time, contribute to our initiatives, or subscribe as a member. See the Get Involved page for membership packages."),
    ("Do you support environmental start-ups?", "Yes. We support start-ups across environmental sectors, deliberately prioritising ventures led by women, youth and persons with disabilities."),
]

DOCS = [
    "Certificate of Registration / Incorporation",
    "NGO Registration Certificate",
    "Memorandum and Articles / Constitution",
    "Tax Identification Number (TIN) Certificate",
]

ACCOUNTABILITY = [
    "Board oversight of strategic and financial decisions.",
    "Defined organisational policies and administrative procedures.",
    "Financial management systems with regular reporting.",
    "Project planning, monitoring, evaluation, accountability and learning (MEAL) mechanisms.",
    "Procurement and asset management procedures.",
    "Human resource policies governing recruitment, performance management and staff welfare.",
    "Compliance with statutory reporting obligations and donor requirements.",
]

SECRETARIAT = [
    "Team Lead",
    "Legal and Ethical Officer",
    "Finance and Administration Officer",
    "Partnerships and Development",
    "Publicity and Mobilization Officer",
    "IT and Content Development Officer",
    "Administration Assistants",
]

PROJECT_OFFICERS = [
    "Research, Innovation and Development",
    "Community Advocacy and Education",
    "Climate Action and Disaster Resilience",
    "Climate Smart Agriculture",
    "Culture, Eco-tourism and Cottage Industry",
]

PARTNERS = [
    "Kyambogo University",
    "Makerere University",
    "ARIEC",
    "KCFS Lab",
    "Gayaza Girls School",
    "Kyaka II Host Communities",
]

POSTS = [
    dict(
        slug="community-restoration-tree-planting",
        title="Growing forests with the people who tend them",
        tag="Conservation",
        date="2026-05-18",
        excerpt="What we have learned from tree-growing and ecosystem restoration campaigns in Kampala, Wakiso, Mukono and the Kyaka II refugee host communities.",
        body=[
            "Since 2022 our restoration teams have worked alongside households, schools and local councils to put indigenous and fruit trees back into landscapes that have been steadily thinning out. The planting day is the easy part. Survival rates depend on who feels ownership of the seedling twelve months later.",
            "In Kyegegwa District, where refugee and host communities share fragile land and firewood demand is high, we pair every planting site with a community caretaker arrangement. Fruit species are deliberately included so that the trees carry household value, not just environmental value.",
            "Restoration only holds when the community sees a direct return. Fodder, fruit, shade, soil stability and windbreaks are all part of the pitch — and they are the reason a plot still has trees standing three seasons later.",
            "Our next phase focuses on nursery capacity within the communities themselves, so that seedling supply no longer depends on a single external delivery each season.",
        ],
        image="hero-2.jpg",
    ),
    dict(
        slug="climate-environmental-education",
        title="Reaching 5,000 young people with climate education",
        tag="Education",
        date="2026-04-02",
        excerpt="School outreach and youth capacity-building at Kyambogo University, Makerere University, Gayaza Girls School and community groups across Central Uganda.",
        body=[
            "Environmental education is the quietest part of our work and arguably the most durable. Since 2023 our awareness campaigns and workshops have reached more than 5,000 young people across Central Uganda.",
            "The format is deliberately practical: waste audits on campus, seedling nurseries at schools, and sessions where students design a response to an environmental problem they can actually see from the classroom window.",
            "University partnerships give the programme depth. At Kyambogo and Makerere, student fellows carry sessions into their own faculties and communities, extending reach far beyond what a small secretariat could deliver alone.",
            "We measure success by what happens after the workshop — the clubs that keep meeting, the nurseries that keep producing, and the students who go on to join our field research.",
        ],
        image="hero-1.jpg",
    ),
    dict(
        slug="research-community-based-conservation",
        title="Building the evidence base for community conservation",
        tag="Research",
        date="2026-02-11",
        excerpt="Field studies on biodiversity, waste management and climate resilience with Kyambogo University, including work in Kyaka II Refugee Settlement.",
        body=[
            "Too little accurate, timely information exists about environmental change on the ground in Uganda. Since 2024 we have supported field studies on biodiversity, waste management and climate resilience in collaboration with Kyambogo University.",
            "Community-based conservation needs numbers as much as goodwill. Baseline surveys tell us which species are returning, how waste streams actually move through a settlement, and where resilience investments would matter most.",
            "In Kyaka II Refugee Settlement and its host communities, research is designed with local participation from the start — residents help define the questions and collect the data, which makes the findings both more accurate and more usable.",
            "Findings feed directly into programme design and into policy conversations with local government and development partners.",
        ],
        image="hero-3.jpg",
    ),
    dict(
        slug="youth-innovation-green-skills",
        title="Boot camps, hackathons and the business of green skills",
        tag="Innovation",
        date="2025-11-27",
        excerpt="How innovation boot camps and mentorship equip young people with practical solutions in climate action, waste management and green entrepreneurship.",
        body=[
            "Young Ugandans are not short of ideas for climate action. What they lack is a structured route from idea to a working, funded venture.",
            "Our innovation boot camps and hackathons compress that route: a problem brief drawn from real community needs, a few intense days of prototyping, and then months of mentorship for the teams that show promise.",
            "Waste management and circular-economy ventures dominate the pipeline, followed by clean energy and climate-smart agriculture tools. We deliberately prioritise teams led by women, youth and persons with disabilities.",
            "Green skills training runs alongside, so participants leave with capabilities that are employable whether or not their own venture takes off.",
        ],
        image="hero-2.jpg",
    ),
    dict(
        slug="kcfs-lab-climate-finance",
        title="Opening up climate finance through the KCFS Lab",
        tag="Climate Finance",
        date="2025-09-09",
        excerpt="Establishing the Kyambogo University Climate Finance Solutions Lab to strengthen climate finance knowledge, research and access.",
        body=[
            "Climate finance exists, but the pathways to it are opaque for the youth groups, local governments and community organisations who most need it.",
            "The Kyambogo University Climate Finance Solutions Lab (KCFS Lab), which we are leading the establishment of from 2025, is designed to close that gap — combining research, training and hands-on proposal support.",
            "The Lab brings together university researchers, local government planners and community organisations so that finance literacy is built where projects are actually designed.",
            "Over time we expect the Lab to function as a standing resource for the region: a place to test proposal ideas, understand donor and fund requirements, and build the evidence a serious application needs.",
        ],
        image="hero-3.jpg",
    ),
]


def page_header(title, lead):
    inner = (
        f'<!-- wp:heading {{"level":1,"textColor":"base","style":{{"typography":{{"fontSize":"clamp(2rem,4vw,3rem)"}}}}}} -->\n'
        f'<h1 class="wp-block-heading has-base-color has-text-color" style="font-size:clamp(2rem,4vw,3rem)">{escape(title)}</h1>\n<!-- /wp:heading -->\n'
        f'<!-- wp:paragraph {{"textColor":"base"}} -->\n<p class="has-base-color has-text-color">{escape(lead)}</p>\n<!-- /wp:paragraph -->'
    )
    return group(inner, bg="brand-dark")


def home_page():
    parts = [
        cover(
            "hero-1.jpg",
            "Welcome to Environmental Hub Uganda",
            "A youth-led NGO promoting sustainability and resilience in Uganda through climate action, conservation, education and research. Join us in building a greener future where nature thrives and communities prosper.",
            [("About us", "/about-us/"), ("Get involved", "/get-involved/")],
        ),
        group(
            eyebrow("Who we are")
            + "\n"
            + heading_block("A youth-led environmental organisation")
            + "\n"
            + columns(
                [
                    p("Environmental Hub Uganda (Bricks Environment and Climate Hub Initiative Uganda) is a youth-led non-governmental organisation dedicated to environmental conservation, climate resilience and sustainable development. We empower youth, women and communities to design and implement innovative, sustainable solutions to environmental challenges."),
                    p("Established in 2023 and registered as an NGO under the laws of Uganda, EHUG advances environmental sustainability, climate action, biodiversity conservation, research, innovation and community resilience across the country."),
                ]
            )
        ),
        group(
            eyebrow("Mission &amp; vision")
            + "\n"
            + columns(
                [
                    card(heading_block("Our Mission", 3) + "\n" + p("To promote community involvement in creating a sustainable environment for generations."), "is-style-envhub-bordered"),
                    card(heading_block("Our Vision", 3) + "\n" + p("Creating a sustainable environment for improved quality of life and socioeconomic transformation."), "is-style-envhub-bordered"),
                ]
            ),
            bg="secondary",
        ),
        group(
            eyebrow("Core activities")
            + "\n"
            + heading_block("What we do")
            + "\n"
            + card_grid([(t, p(escape(txt))) for t, txt, _ in ACTIVITIES], per_row=2)
        ),
        group(
            eyebrow("Director's message")
            + "\n"
            + columns(
                [
                    f'<!-- wp:image {{"sizeSlug":"large","className":"is-style-envhub-card"}} -->\n<figure class="wp-block-image size-large is-style-envhub-card"><img src="{SITE}{IMG}/director.jpg" alt="Executive Director, Environmental Hub Uganda"/></figure>\n<!-- /wp:image -->',
                    heading_block("A message from our Team Lead", 3)
                    + "\n"
                    + p("Uganda&rsquo;s landscapes are changing fast, and the communities who depend on them most directly are the ones carrying the cost. Our answer is not to work around those communities but through them.")
                    + "\n"
                    + p("Every programme we run &mdash; restoration, education, research, innovation &mdash; is designed with the people who will live with its results. That is what makes the work last."),
                ]
            ),
            bg="secondary",
        ),
        group(
            eyebrow("From the field")
            + "\n"
            + heading_block("Latest stories")
            + "\n"
            + '<!-- wp:query {"queryId":1,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":false},"align":"wide","layout":{"type":"default"}} -->\n'
            '<div class="wp-block-query alignwide"><!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->\n'
            '<!-- wp:post-featured-image {"isLink":true} /-->\n'
            '<!-- wp:post-title {"isLink":true,"level":3,"fontSize":"medium"} /-->\n'
            '<!-- wp:post-excerpt {"excerptLength":24} /-->\n'
            "<!-- /wp:post-template --></div>\n<!-- /wp:query -->\n"
            + buttons([("Read the blog", "/blog/")])
        ),
        group(
            eyebrow("Partners")
            + "\n"
            + heading_block("Who we work with")
            + "\n"
            + card_grid([(name, "") for name in PARTNERS], per_row=3),
            bg="secondary",
        ),
        group(
            '<!-- wp:heading {"textAlign":"center","textColor":"base"} -->\n<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color">Join the work</h2>\n<!-- /wp:heading -->\n'
            '<!-- wp:paragraph {"align":"center","textColor":"base"} -->\n<p class="has-text-align-center has-base-color has-text-color">Volunteer, become a member, or partner with us on a jointly designed initiative.</p>\n<!-- /wp:paragraph -->\n'
            + buttons([("Get involved", "/get-involved/"), ("Contact us", "/contact/")]),
            bg="brand-dark",
        ),
    ]
    return "\n\n".join(parts)


def about_page():
    return "\n\n".join(
        [
            page_header(
                "About Us",
                "Bricks Environment and Climate Hub Initiative Uganda — a youth-led organisation for environmental conservation, climate resilience and sustainable development.",
            ),
            group(
                eyebrow("Who we are")
                + "\n"
                + heading_block("A youth-led environmental organisation")
                + "\n"
                + columns(
                    [
                        p("Environmental Hub Uganda (Bricks Environment and Climate Hub Initiative Uganda) is a youth-led non-governmental organisation dedicated to environmental conservation, climate resilience and sustainable development. We empower youth, women and communities to design and implement innovative, sustainable solutions to environmental challenges."),
                        p("The organisation is legally registered as a Non-Governmental Organisation under the laws of Uganda and operates under the name Bricks Environment and Climate Hub Initiative Uganda, commonly referred to as Environmental Hub Uganda (EHUG). Established in 2023, it advances environmental sustainability, climate action, biodiversity conservation, research, innovation and community resilience across Uganda."),
                    ]
                )
            ),
            group(
                columns(
                    [
                        card(heading_block("Our Mission", 3) + "\n" + p("To promote community involvement in creating a sustainable environment for generations."), "is-style-envhub-bordered"),
                        card(heading_block("Our Vision", 3) + "\n" + p("Creating a sustainable environment for improved quality of life and socioeconomic transformation."), "is-style-envhub-bordered"),
                    ]
                ),
                bg="secondary",
            ),
            group(
                eyebrow("What guides us")
                + "\n"
                + heading_block("Core Values")
                + "\n"
                + card_grid([(name, p(escape(text))) for name, text in VALUES], per_row=3)
            ),
            group(
                eyebrow("Legal status")
                + "\n"
                + heading_block("Registered and accountable")
                + "\n"
                + p("Environmental Hub Uganda has legal personality, enabling it to enter into contracts, receive grants and donations, implement projects, and establish partnerships with government institutions, development partners, academic institutions and the private sector. Full governance detail — the Board of Trustees, management team and accountability systems — is set out on the <a href=\"/team-governance/\">Team &amp; Governance</a> page."),
                bg="secondary",
            ),
            group(
                eyebrow("Core activities")
                + "\n"
                + heading_block("Where we focus")
                + "\n"
                + card_grid([(t, "") for t, _, _ in ACTIVITIES], per_row=4)
                + "\n"
                + buttons([("See our work", "/our-work/")])
            ),
        ]
    )


def our_work_page():
    blocks = [
        page_header(
            "Our Work",
            "Four core activities carry our mandate: climate mitigation and adaptation, conservation and restoration, environmental education, and research and innovation.",
        )
    ]
    for i, (title, text, points) in enumerate(ACTIVITIES):
        inner = (
            eyebrow(f"{i + 1:02d}")
            + "\n"
            + heading_block(title)
            + "\n"
            + columns([p(escape(text)), ul(points)])
        )
        blocks.append(group(inner, bg=None if i % 2 == 0 else "secondary"))
    return "\n\n".join(blocks)


def impact_page():
    stats = [
        ("5,000+", "Young people reached"),
        ("4", "Districts of active restoration"),
        ("8", "Core staff, plus fellows and volunteers"),
        ("2019", "Community work began"),
    ]
    experience = [
        ("Community Restoration and Tree Planting", "2022 – Present", "Tree-growing and ecosystem restoration campaigns in Kampala, Wakiso, Mukono and Kyegegwa District (Kyaka II refugee host communities), promoting indigenous and fruit tree planting, environmental awareness and community participation in landscape restoration.", "community-restoration-tree-planting"),
        ("Climate and Environmental Education", "2023 – Present", "Environmental awareness campaigns, school outreach programmes and youth capacity-building workshops at Kyambogo University, Makerere University, Gayaza Girls School and community groups across Central Uganda, reaching over 5,000 young people.", "climate-environmental-education"),
        ("Research and Community-Based Conservation", "2024 – Present", "Environmental research and field studies on biodiversity, waste management and climate resilience in collaboration with Kyambogo University, including community engagement in Kyaka II Refugee Settlement and surrounding host communities.", "research-community-based-conservation"),
        ("Youth Innovation and Green Skills", "2022 – Present", "Innovation boot camps, hackathons and mentorship programmes that equip young people with practical solutions in climate action, waste management and green entrepreneurship.", "youth-innovation-green-skills"),
        ("Climate Finance and Sustainable Development", "2025 – Present", "Leading the establishment of the Kyambogo University Climate Finance Solutions Lab (KCFS Lab) to strengthen climate finance knowledge, research and access for youth, local governments, researchers and community organisations.", "kcfs-lab-climate-finance"),
    ]
    stat_cards = [
        (
            value,
            f'<!-- wp:paragraph {{"align":"center"}} -->\n<p class="has-text-align-center">{escape(label)}</p>\n<!-- /wp:paragraph -->',
        )
        for value, label in stats
    ]
    exp_blocks = "\n".join(
        card(
            eyebrow(period)
            + "\n"
            + heading_block(title, 3)
            + "\n"
            + p(escape(text))
            + "\n"
            + p(f'<a href="/{slug}/">Read the story →</a>')
        )
        for title, period, text, slug in experience
    )
    return "\n\n".join(
        [
            page_header(
                "Our Impact",
                "Community-based environmental and climate action across Uganda, with a strong focus on biodiversity conservation, ecosystem restoration, climate resilience, environmental education and youth empowerment.",
            ),
            group(card_grid(stat_cards, per_row=4)),
            group(
                eyebrow("Relevant experience")
                + "\n"
                + heading_block("Programmes and results")
                + "\n"
                + exp_blocks,
                bg="secondary",
            ),
        ]
    )


def team_page():
    staff_rows = "\n".join(
        f"<tr><td>{escape(role)}</td><td>{escape(duties)}</td></tr>" for role, duties in STAFF
    )
    table = (
        '<!-- wp:table {"align":"wide","className":"is-style-stripes"} -->\n'
        '<figure class="wp-block-table alignwide is-style-stripes"><table><thead><tr><th>Position</th><th>Key responsibilities</th></tr></thead><tbody>'
        f"{staff_rows}</tbody></table></figure>\n<!-- /wp:table -->"
    )
    levels = [
        ("Level 1 — The Board of Trustees", "Strategic leadership, policy oversight, fiduciary guidance and organisational accountability."),
        ("Level 2 — The Top Management", "Executive management led by the Team Lead, responsible for day-to-day operations and programme implementation."),
        ("Level 3 — The Secretariat", "Officers and project teams delivering programmes in the field."),
    ]
    return "\n\n".join(
        [
            page_header(
                "Team & Governance",
                "Organisational structure, governance and administration of Bricks Environment and Climate Hub Initiative Uganda (EHUG).",
            ),
            group(
                eyebrow("Legal status")
                + "\n"
                + heading_block("A registered Ugandan NGO")
                + "\n"
                + p("Environmental Hub Uganda is legally registered in Uganda as a Non-Governmental Organisation and operates under the name Bricks Environment and Climate Hub Initiative Uganda, commonly referred to as Environmental Hub Uganda (EHUG). The organisation has legal personality, enabling it to enter into contracts, receive grants and donations, implement projects, and establish partnerships with government institutions, development partners, academic institutions and the private sector.")
                + "\n"
                + card(heading_block("Supporting legal documentation (attached as annexes)", 3) + "\n" + ul(DOCS))
            ),
            group(
                eyebrow("Hierarchy of leadership")
                + "\n"
                + heading_block("How we are organised")
                + "\n"
                + card_grid([(t, p(escape(d))) for t, d in levels], per_row=3)
                + "\n"
                + columns(
                    [
                        card(heading_block("Secretariat roles", 3) + "\n" + ul(SECRETARIAT)),
                        card(heading_block("Project officers", 3) + "\n" + ul(PROJECT_OFFICERS)),
                    ]
                ),
                bg="secondary",
            ),
            group(
                eyebrow("Governance structure")
                + "\n"
                + heading_block("Oversight separated from management")
                + "\n"
                + p("Environmental Hub Uganda is governed by a Board of Trustees that approves strategic plans, budgets and organisational policies, and ensures compliance with statutory and donor requirements. The governance structure is further supported by a Patron, who provides institutional guidance and strategic support; a Legal Advisor, who provides legal counsel and ensures regulatory compliance; and an Executive Management Team led by the Team Lead (Executive Director). This arrangement separates oversight from management, ensuring good governance and adherence to nonprofit best practice.")
            ),
            group(
                eyebrow("Administration and staffing")
                + "\n"
                + heading_block("Eight core positions")
                + "\n"
                + p("The organisation operates with a multidisciplinary management team of eight core personnel, complemented by volunteers, interns, consultants and project-based technical experts engaged according to programme needs.")
                + "\n"
                + table
                + "\n"
                + p("Beyond the core staff, the organisation maintains a network of environmental experts, researchers, university collaborators, volunteers and student fellows who support project implementation across Uganda."),
                bg="secondary",
            ),
            group(
                eyebrow("Accountability")
                + "\n"
                + heading_block("Governance and accountability mechanisms")
                + "\n"
                + ul(ACCOUNTABILITY)
                + "\n"
                + p("These systems enable the organisation to effectively manage grants, partnerships and multi-stakeholder initiatives.")
            ),
        ]
    )


def get_involved_page():
    tiers = [
        (
            name,
            f'<!-- wp:paragraph {{"style":{{"typography":{{"fontSize":"1.5rem","fontWeight":"700"}}}},"textColor":"primary"}} -->\n<p class="has-primary-color has-text-color" style="font-size:1.5rem;font-weight:700">{escape(cost)}</p>\n<!-- /wp:paragraph -->\n'
            + ul(features)
            + "\n"
            + buttons([("Subscribe", "/contact/")]),
        )
        for name, cost, features in MEMBERSHIP
    ]
    ways = [
        ("Volunteer", "Join field days, restoration campaigns and school outreach. Tell us your background and interests and we will match you to an active programme."),
        ("Partner with us", "We work with community groups, schools, universities, local governments, cooperatives and development partners on jointly designed initiatives."),
        ("Donate", "Contributions fund seedlings, workshops, research and youth innovation support. Get in touch and we will share our current funding priorities."),
    ]
    return "\n\n".join(
        [
            page_header(
                "Get Involved",
                "Membership, volunteering, partnerships and donations — several ways to join the work of building a sustainable environment for generations.",
            ),
            group(
                eyebrow("Membership")
                + "\n"
                + heading_block("Annual subscription packages")
                + "\n"
                + card_grid(tiers, per_row=2)
                + "\n"
                + p("Subscriptions are payable annually to the organisation&rsquo;s treasury.")
            ),
            group(
                eyebrow("Other ways to help")
                + "\n"
                + heading_block("Volunteer, partner, give")
                + "\n"
                + card_grid([(t, p(escape(d))) for t, d in ways], per_row=3)
                + "\n"
                + buttons([("Talk to our team", "/contact/")]),
                bg="secondary",
            ),
        ]
    )


def resources_page():
    faq_blocks = "\n".join(
        f'<!-- wp:details -->\n<details class="wp-block-details"><summary>{escape(q)}</summary>\n'
        f"<!-- wp:paragraph -->\n<p>{escape(a)}</p>\n<!-- /wp:paragraph -->\n</details>\n<!-- /wp:details -->"
        for q, a in FAQS
    )
    pubs = "\n".join(
        f'<!-- wp:paragraph -->\n<p><strong>{escape(pp["tag"])}</strong> — <a href="/{pp["slug"]}/">{escape(pp["title"])}</a></p>\n<!-- /wp:paragraph -->'
        for pp in POSTS
    )
    return "\n\n".join(
        [
            page_header(
                "Resources",
                "Frequently asked questions, organisational documents and writing from our field and research programmes.",
            ),
            group(eyebrow("FAQs") + "\n" + heading_block("Frequently asked questions") + "\n" + faq_blocks),
            group(
                eyebrow("Documents")
                + "\n"
                + heading_block("Organisational documents")
                + "\n"
                + p("These statutory documents are available on request for partners, donors and grant processes.")
                + "\n"
                + ul(DOCS),
                bg="secondary",
            ),
            group(eyebrow("Publications") + "\n" + heading_block("From our programmes") + "\n" + pubs),
        ]
    )


def contact_page():
    form = (
        card(
            heading_block("Send us a message", 3)
            + "\n"
            + p("Add your preferred contact form block here (any form plugin), or email us directly at <a href=\"mailto:info@envhub-ug.org\">info@envhub-ug.org</a>.")
        )
    )
    details = card(
        heading_block("Contact details", 3)
        + "\n"
        + ul(["Kampala, Uganda", "info@envhub-ug.org", "+256 700 000 000"])
    )
    return "\n\n".join(
        [
            page_header(
                "Contact Us",
                "Partnerships, membership, volunteering or media — send us a message and the relevant team will respond.",
            ),
            group(eyebrow("Get in touch") + "\n" + columns([details, form])),
        ]
    )


def blog_page():
    return page_header(
        "Blog",
        "Field notes, research findings and programme updates from Environmental Hub Uganda.",
    )


PAGES = [
    ("Home", "home", home_page(), 1, "front-page"),
    ("About Us", "about-us", about_page(), 2, ""),
    ("Our Work", "our-work", our_work_page(), 3, ""),
    ("Impact", "impact", impact_page(), 4, ""),
    ("Team & Governance", "team-governance", team_page(), 5, ""),
    ("Get Involved", "get-involved", get_involved_page(), 6, ""),
    ("Resources", "resources", resources_page(), 7, ""),
    ("Blog", "blog", blog_page(), 8, ""),
    ("Contact", "contact", contact_page(), 9, ""),
]

# ------------------------------------------------- live CMS snapshot overrides

# Maps the CMS page slug (React routes / database) to the WordPress page slug.
CMS_SLUG_MAP = {
    "home": "home",
    "about": "about-us",
    "our-work": "our-work",
    "impact": "impact",
    "team": "team-governance",
    "get-involved": "get-involved",
    "resources": "resources",
    "blog": "blog",
    "contact": "contact",
}
WP_SLUG_MAP = {v: k for k, v in CMS_SLUG_MAP.items()}

SETTINGS = {}
MENUS = {"header": [], "footer": []}

FALLBACK_IMAGES = ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg"]


def _replace_header(content, title, lead):
    """Swap the page-header <h1> and its intro paragraph with the CMS values."""
    if title:
        content = re.sub(
            r"(<h1[^>]*>)(.*?)(</h1>)",
            lambda m: m.group(1) + escape(title) + m.group(3),
            content,
            count=1,
            flags=re.S,
        )
    if lead:
        # first paragraph after the h1
        pos = content.find("</h1>")
        if pos != -1:
            head, tail = content[:pos], content[pos:]
            tail = re.sub(
                r"(<p[^>]*>)(.*?)(</p>)",
                lambda m: m.group(1) + escape(lead) + m.group(3),
                tail,
                count=1,
                flags=re.S,
            )
            content = head + tail
    return content


def apply_cms_snapshot():
    """Overlay the live database content on top of the built-in defaults."""
    global PAGES, POSTS, SETTINGS, MENUS
    snap_path = Path(__file__).parent / "cms-snapshot.json"
    if not snap_path.exists():
        print("no cms-snapshot.json found — using built-in defaults")
        return
    snap = json.loads(snap_path.read_text(encoding="utf-8"))

    SETTINGS = {s["key"]: (s.get("value") or "") for s in snap.get("site_settings", [])}

    # ---- pages: titles, leads and SEO descriptions come from the CMS
    by_wp_slug = {}
    for row in snap.get("pages", []):
        wp_slug = CMS_SLUG_MAP.get(row["slug"])
        if wp_slug:
            by_wp_slug[wp_slug] = row
    new_pages = []
    for title, slug, content, order, tpl in PAGES:
        row = by_wp_slug.get(slug)
        if row:
            title = row.get("title") or title
            content = _replace_header(content, row.get("title"), row.get("lead"))
            if row.get("body"):
                content = content + "\n\n" + markdown_to_blocks(row["body"])
        new_pages.append((title, slug, content, order, tpl))
    PAGES = new_pages
    PAGE_META.update(
        {
            slug: (by_wp_slug[slug].get("meta_description") or "")
            for slug in by_wp_slug
        }
    )

    # ---- blog posts straight from the CMS
    rows = [r for r in snap.get("posts", []) if r.get("published")]
    rows.sort(key=lambda r: r.get("published_at") or r.get("created_at") or "", reverse=True)
    if rows:
        POSTS = []
        for i, r in enumerate(rows):
            body = [b.strip() for b in re.split(r"\n\s*\n", r.get("body") or "") if b.strip()]
            date = (r.get("published_at") or r.get("created_at") or "2026-01-05")[:10]
            POSTS.append(
                dict(
                    slug=r["slug"],
                    title=r["title"],
                    tag=r.get("tag") or "News",
                    date=date,
                    excerpt=r.get("excerpt") or "",
                    body=body,
                    image=FALLBACK_IMAGES[i % len(FALLBACK_IMAGES)],
                    cover_url=r.get("cover_url") or "",
                )
            )

    # ---- menus
    for loc in ("header", "footer"):
        items = [
            m
            for m in snap.get("menu_items", [])
            if m.get("location") == loc and m.get("visible", True)
        ]
        items.sort(key=lambda m: m.get("sort_order") or 0)
        MENUS[loc] = [
            (m["label"], CMS_SLUG_MAP.get((m.get("url") or "/").strip("/"), ""), m.get("url"))
            for m in items
        ]

    print(
        "applied cms snapshot:",
        len(PAGES),
        "pages,",
        len(POSTS),
        "posts,",
        {k: len(v) for k, v in MENUS.items()},
        "menu items",
    )


PAGE_META = {}


def markdown_to_blocks(text):
    """Very small markdown subset -> block markup (matches the CMS editor)."""
    out, bullets = [], []

    def flush():
        if bullets:
            out.append(ul(bullets[:]))
            bullets.clear()

    for raw in (text or "").split("\n"):
        line = raw.strip()
        if not line:
            flush()
            continue
        if line.startswith("## "):
            flush()
            out.append(heading_block(line[3:].strip(), 2))
        elif line.startswith("- "):
            bullets.append(line[2:].strip())
        else:
            flush()
            out.append(p(escape(line)))
    flush()
    return "\n\n".join(out)


# ---------------------------------------------------------------- WXR assembly



def cdata(text):
    return "<![CDATA[" + text.replace("]]>", "]]]]><![CDATA[>") + "]]>"


def item(
    title,
    slug,
    content,
    post_type,
    post_id,
    date,
    excerpt="",
    menu_order=0,
    categories=None,
    meta=None,
    parent=0,
    status="publish",
):
    cats = ""
    for taxonomy, name, nicename in categories or []:
        cats += f'\n    <category domain="{taxonomy}" nicename="{nicename}">{cdata(name)}</category>'
    metas = ""
    for k, v in (meta or {}).items():
        metas += (
            f"\n    <wp:postmeta>\n      <wp:meta_key>{cdata(k)}</wp:meta_key>"
            f"\n      <wp:meta_value>{cdata(str(v))}</wp:meta_value>\n    </wp:postmeta>"
        )
    gmt = date
    return f"""  <item>
    <title>{cdata(title)}</title>
    <link>{SITE}/{slug}/</link>
    <pubDate>{datetime.strptime(date, "%Y-%m-%d %H:%M:%S").strftime("%a, %d %b %Y %H:%M:%S +0000")}</pubDate>
    <dc:creator>{cdata(AUTHOR)}</dc:creator>
    <guid isPermaLink="false">{SITE}/?p={post_id}</guid>
    <description></description>
    <content:encoded>{cdata(content)}</content:encoded>
    <excerpt:encoded>{cdata(excerpt)}</excerpt:encoded>
    <wp:post_id>{post_id}</wp:post_id>
    <wp:post_date>{cdata(date)}</wp:post_date>
    <wp:post_date_gmt>{cdata(gmt)}</wp:post_date_gmt>
    <wp:comment_status>{cdata("closed")}</wp:comment_status>
    <wp:ping_status>{cdata("closed")}</wp:ping_status>
    <wp:post_name>{cdata(slug)}</wp:post_name>
    <wp:status>{cdata(status)}</wp:status>
    <wp:post_parent>{parent}</wp:post_parent>
    <wp:menu_order>{menu_order}</wp:menu_order>
    <wp:post_type>{cdata(post_type)}</wp:post_type>
    <wp:post_password></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>{cats}{metas}
  </item>
"""


def build():
    apply_cms_snapshot()
    items = []
    pid = 100
    page_ids = {}

    for title, slug, content, order, _tpl in PAGES:
        pid += 1
        page_ids[slug] = pid
        items.append(
            item(
                title,
                slug,
                content,
                "page",
                pid,
                "2026-01-05 09:00:00",
                menu_order=order,
                excerpt=PAGE_META.get(slug, ""),
                meta={"_wp_page_template": "default"},
            )
        )

    for post in POSTS:
        pid += 1
        img = post.get("cover_url") or f"{SITE}{IMG}/{post['image']}"
        content = "\n\n".join(
            [
                f'<!-- wp:image {{"sizeSlug":"large"}} -->\n<figure class="wp-block-image size-large"><img src="{img}" alt="{escape(post["title"])}"/></figure>\n<!-- /wp:image -->'
            ]
            + [p(escape(par)) for par in post["body"]]
        )
        items.append(
            item(
                post["title"],
                post["slug"],
                content,
                "post",
                pid,
                post["date"] + " 09:00:00",
                excerpt=post["excerpt"],
                categories=[
                    ("category", post["tag"], re.sub(r"[^a-z0-9]+", "-", post["tag"].lower()).strip("-"))
                ],
            )
        )

    # Navigation menus (header -> "Primary", footer -> "Footer"), from the CMS
    def menu_entries(location, term_name, term_slug):
        entries = MENUS.get(location) or []
        if not entries:
            entries = [(t, s, "/" + s) for t, s, *_ in PAGES if s != "home"]
        out = []
        order = 1
        for label, wp_slug, url in entries:
            nonlocal pid
            pid += 1
            if wp_slug and wp_slug in page_ids:
                meta = {
                    "_menu_item_type": "post_type",
                    "_menu_item_menu_item_parent": "0",
                    "_menu_item_object_id": page_ids[wp_slug],
                    "_menu_item_object": "page",
                    "_menu_item_target": "",
                    "_menu_item_classes": 'a:1:{i:0;s:0:"";}',
                    "_menu_item_url": "",
                }
            else:
                meta = {
                    "_menu_item_type": "custom",
                    "_menu_item_menu_item_parent": "0",
                    "_menu_item_object_id": pid,
                    "_menu_item_object": "custom",
                    "_menu_item_target": "",
                    "_menu_item_classes": 'a:1:{i:0;s:0:"";}',
                    "_menu_item_url": url or "/",
                }
            out.append(
                item(
                    label,
                    f"menu-item-{pid}",
                    "",
                    "nav_menu_item",
                    pid,
                    "2026-01-05 09:00:00",
                    menu_order=order,
                    categories=[("nav_menu", term_name, term_slug)],
                    meta=meta,
                )
            )
            order += 1
        return out

    items.extend(menu_entries("header", "Primary", "primary"))
    items.extend(menu_entries("footer", "Footer", "footer"))


    cats_xml = ""
    seen = set()
    for post in POSTS:
        nice = re.sub(r"[^a-z0-9]+", "-", post["tag"].lower()).strip("-")
        if nice in seen:
            continue
        seen.add(nice)
        cats_xml += (
            f"  <wp:category>\n    <wp:category_nicename>{cdata(nice)}</wp:category_nicename>\n"
            f"    <wp:category_parent></wp:category_parent>\n"
            f"    <wp:cat_name>{cdata(post['tag'])}</wp:cat_name>\n  </wp:category>\n"
        )
    cats_xml += (
        "  <wp:term>\n    <wp:term_id>90</wp:term_id>\n    <wp:term_taxonomy>nav_menu</wp:term_taxonomy>\n"
        f"    <wp:term_slug>primary</wp:term_slug>\n    <wp:term_name>{cdata('Primary')}</wp:term_name>\n  </wp:term>\n"
        "  <wp:term>\n    <wp:term_id>91</wp:term_id>\n    <wp:term_taxonomy>nav_menu</wp:term_taxonomy>\n"
        f"    <wp:term_slug>footer</wp:term_slug>\n    <wp:term_name>{cdata('Footer')}</wp:term_name>\n  </wp:term>\n"
    )


    xml = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Environmental Hub Uganda</title>
  <link>{SITE}</link>
  <description>Youth-led NGO for environmental conservation, climate resilience and sustainable development</description>
  <pubDate>{datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")}</pubDate>
  <language>en-US</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>{SITE}</wp:base_site_url>
  <wp:base_blog_url>{SITE}</wp:base_blog_url>
  <wp:author><wp:author_id>1</wp:author_id><wp:author_login>{cdata(AUTHOR)}</wp:author_login><wp:author_email>{cdata("info@envhub-ug.org")}</wp:author_email><wp:author_display_name>{cdata("Environmental Hub Uganda")}</wp:author_display_name><wp:author_first_name>{cdata("")}</wp:author_first_name><wp:author_last_name>{cdata("")}</wp:author_last_name></wp:author>
{cats_xml}{"".join(items)}</channel>
</rss>
"""
    return xml


if __name__ == "__main__":
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "envhub-demo-content.xml")
    out.write_text(build(), encoding="utf-8")
    print("wrote", out, out.stat().st_size, "bytes")
