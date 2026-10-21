import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Cloud,
  Code2,
  Container,
  Download,
  ExternalLink,
  FileText,
  Github,
  GitBranch,
  Globe2,
  Layers3,
  Linkedin,
  LoaderCircle,
  Menu,
  Moon,
  Network,
  Play,
  Rocket,
  Send,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Twitter,
  Workflow,
  X as XIcon,
  Zap,
} from "lucide-react";

type IconType = LucideIcon;

const links = {
  github: "https://github.com/Kasim2908",
  linkedin: "https://www.linkedin.com/in/mohammad-kasim-391325372/",
  x: "https://x.com/kasim2908",
  existingPortfolio: "https://kasim2908.github.io/Kasim-explore/",
  repository: "https://github.com/Kasim2908/REPO-DD8280B8",
  week2: "https://github.com/Kasim2908/REPO-DD8280B8/tree/main/Week2",
  week2Docs:
    "https://github.com/Kasim2908/REPO-DD8280B8/blob/main/Week2/week2-documentation.md",
  week2Runbook:
    "https://github.com/Kasim2908/REPO-DD8280B8/blob/main/Week2/RUNBOOK.md",
  week4: "https://github.com/Kasim2908/REPO-DD8280B8/tree/main/Week4",
  week4Manifests:
    "https://github.com/Kasim2908/REPO-DD8280B8/tree/main/Week4/kubernetes-project",
  week4Docs:
    "https://github.com/Kasim2908/REPO-DD8280B8/blob/main/Week4/Readme.md",
};

type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  { label: "GitHub profile", href: links.github, icon: Github },
  { label: "LinkedIn profile", href: links.linkedin, icon: Linkedin },
  { label: "X profile", href: links.x, icon: Twitter },
];

type Skill = {
  name: string;
  status: "practiced" | "learning";
};

type SkillGroup = {
  label: string;
  icon: IconType;
  accent: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Linux & version control",
    icon: Terminal,
    accent: "cyan",
    skills: [
      { name: "Linux", status: "practiced" },
      { name: "Git", status: "practiced" },
      { name: "GitHub", status: "practiced" },
    ],
  },
  {
    label: "Containers & orchestration",
    icon: Container,
    accent: "violet",
    skills: [
      { name: "Docker", status: "practiced" },
      { name: "Docker Compose", status: "learning" },
      { name: "Kubernetes", status: "practiced" },
      { name: "Minikube", status: "practiced" },
    ],
  },
  {
    label: "CI/CD & automation",
    icon: Workflow,
    accent: "blue",
    skills: [
      { name: "GitHub Actions", status: "practiced" },
      { name: "Jenkins", status: "learning" },
      { name: "Bash scripting", status: "practiced" },
    ],
  },
  {
    label: "Cloud & infrastructure",
    icon: Cloud,
    accent: "amber",
    skills: [
      { name: "AWS", status: "practiced" },
      { name: "Terraform", status: "learning" },
      { name: "Ansible", status: "learning" },
    ],
  },
  {
    label: "Monitoring & GitOps",
    icon: Settings2,
    accent: "emerald",
    skills: [
      { name: "Prometheus", status: "learning" },
      { name: "Grafana", status: "learning" },
      { name: "Argo CD", status: "learning" },
    ],
  },
];

type TimelineItem = {
  week: string;
  title: string;
  description: string;
  href: string;
  hrefLabel: string;
  status: "verified" | "documented" | "in-progress";
};

const timeline: TimelineItem[] = [
  {
    week: "01",
    title: "Linux & Git foundations",
    description:
      "Built the working rhythm for the internship: Linux commands, Git workflows, branching and project selection.",
    href: "https://github.com/Kasim2908/REPO-DD8280B8/tree/main/Week1",
    hrefLabel: "Review Week 1",
    status: "documented",
  },
  {
    week: "02",
    title: "CI/CD pipeline build",
    description:
      "Created the Python application workflow around automated tests, Docker packaging and an AWS EC2 deployment path.",
    href: links.week2,
    hrefLabel: "Review Week 2",
    status: "verified",
  },
  {
    week: "03",
    title: "Verification & security investigation",
    description:
      "Verified the pipeline flow, practised container tests and investigated Trivy findings. The security investigation is clearly documented as ongoing.",
    href: "https://github.com/Kasim2908/REPO-DD8280B8/tree/main/Week3",
    hrefLabel: "Review Week 3",
    status: "in-progress",
  },
  {
    week: "04",
    title: "Kubernetes resource management",
    description:
      "Worked through Nginx replicas, NodePort exposure, health probes, configuration, secrets and namespace isolation on Minikube.",
    href: links.week4,
    hrefLabel: "Review Week 4",
    status: "verified",
  },
  {
    week: "05",
    title: "Helm learning sprint",
    description:
      "Documented Helm chart practice and deployment concepts. The referenced chart is not included in this repository, so the work is presented as learning evidence.",
    href: "https://github.com/Kasim2908/REPO-DD8280B8/tree/main/Week5",
    hrefLabel: "Review Week 5",
    status: "documented",
  },
  {
    week: "06",
    title: "Portfolio & final submission",
    description:
      "Translated the internship work into a recruiter-friendly portfolio with honest evidence, clear runbooks and a path for future growth.",
    href: "#contact",
    hrefLabel: "Start a conversation",
    status: "verified",
  },
];

const projectLinks = {
  pipeline: [
    { label: "View source code", href: links.repository, icon: Github },
    { label: "Project documentation", href: links.week2Docs, icon: FileText },
    { label: "Read runbook", href: links.week2Runbook, icon: BookOpen },
  ],
  kubernetes: [
    { label: "View source code", href: links.repository, icon: Github },
    { label: "View manifests", href: links.week4Manifests, icon: Boxes },
    { label: "Read documentation", href: links.week4Docs, icon: FileText },
  ],
};

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function ExternalAnchor({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

function ArchitectureNode({
  icon: Icon,
  label,
  detail,
  accent = "blue",
}: {
  icon: IconType;
  label: string;
  detail: string;
  accent?: string;
}) {
  return (
    <div className={`architecture-node architecture-node-${accent}`}>
      <span className="architecture-node-icon" aria-hidden="true">
        <Icon size={17} strokeWidth={1.8} />
      </span>
      <span>
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="architecture-connector" aria-hidden="true">
      <span className="connector-line" />
      {label ? <small>{label}</small> : null}
      <ArrowRight size={13} />
    </div>
  );
}

function HeroArchitecture({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="hero-architecture glass-card">
      <div className="architecture-card-header">
        <div>
          <span className="terminal-kicker">/infra/blueprint</span>
          <h2>From commit to cloud</h2>
        </div>
        <span className="live-indicator">
          <span /> live path
        </span>
      </div>
      <div className="architecture-flow hero-flow">
        <ArchitectureNode icon={Github} label="GitHub" detail="source" accent="cyan" />
        <Connector label="push" />
        <ArchitectureNode icon={Workflow} label="Actions" detail="automate" accent="blue" />
        <Connector label="build" />
        <ArchitectureNode icon={Container} label="Docker" detail="package" accent="violet" />
        <Connector label="deploy" />
        <ArchitectureNode icon={Server} label="AWS EC2" detail="runtime" accent="amber" />
      </div>
      <div className="architecture-card-footer">
        <div className="status-pulse">
          <span className="pulse-ring" />
          <span className="status-dot" />
          <span>repeatable delivery path</span>
        </div>
        <div className="kubernetes-chip">
          <Boxes size={14} />
          Kubernetes orchestration
        </div>
      </div>
      <div className={`orbit orbit-one ${reduceMotion ? "orbit-still" : ""}`} />
      <div className={`orbit orbit-two ${reduceMotion ? "orbit-still" : ""}`} />
    </div>
  );
}

function PipelineDiagram({ reduceMotion }: { reduceMotion: boolean | null }) {
  const stages = [
    { label: "Code push", icon: GitBranch },
    { label: "Tests", icon: CheckCircle2 },
    { label: "Docker build", icon: Container },
    { label: "EC2 deploy", icon: Server },
    { label: "Verify", icon: ShieldCheck },
  ];

  return (
    <div className="project-diagram" aria-label="Code push to application verification pipeline">
      <div className="diagram-label-row">
        <span>delivery pipeline</span>
        <span className="diagram-status"><span /> documented flow</span>
      </div>
      <div className="pipeline-stages">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div className="pipeline-stage-wrap" key={stage.label}>
              <motion.div
                className="pipeline-stage"
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 3.4, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon size={16} />
                <span>{stage.label}</span>
              </motion.div>
              {index < stages.length - 1 ? <span className="pipeline-arrow"><ArrowRight size={14} /></span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KubernetesDiagram({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="project-diagram kubernetes-diagram" aria-label="Kubernetes deployment architecture">
      <div className="diagram-label-row">
        <span>cluster topology</span>
        <span className="diagram-status"><span /> three replicas</span>
      </div>
      <div className="kube-architecture">
        <div className="kube-source-node">
          <Code2 size={16} />
          <span>Developer</span>
        </div>
        <ArrowRight className="kube-flow-arrow" size={17} />
        <div className="kube-deployment-node">
          <div className="kube-node-title"><Boxes size={16} /> Deployment</div>
          <small>ReplicaSet controller</small>
          <div className="pod-stack">
            {["nginx-01", "nginx-02", "nginx-03"].map((pod, index) => (
              <motion.span
                key={pod}
                animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.6, delay: index * 0.25, repeat: Infinity }}
              >
                <CircleDot size={11} /> {pod}
              </motion.span>
            ))}
          </div>
        </div>
        <ArrowRight className="kube-flow-arrow" size={17} />
        <div className="kube-service-node">
          <Network size={16} />
          <span>NodePort Service</span>
          <small>health-checked access</small>
        </div>
      </div>
      <div className="kube-footer-tags">
        <span>namespace isolation</span>
        <span>liveness + readiness</span>
        <span>ConfigMap / Secret</span>
      </div>
    </div>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [notice, setNotice] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "demo" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    document.documentElement.dataset.theme = lightTheme ? "light" : "dark";
  }, [lightTheme]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 5200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const navItems = useMemo(
    () => ["about", "skills", "projects", "experience", "achievements", "contact"],
    [],
  );

  const closeMenu = () => setMenuOpen(false);

  const showResumeNotice = () => {
    setNotice("Resume download is not active yet. Add your PDF as public/resume.pdf, then connect the button in App.tsx.");
  };

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "" }));
    if (formStatus === "error" || formStatus === "demo" || formStatus === "success") {
      setFormStatus("idle");
      setFormError("");
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.name.trim()) errors.name = "Please add your full name.";
    if (!formValues.email.trim()) errors.email = "Please add your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) errors.email = "Use a valid email address.";
    if (!formValues.subject.trim()) errors.subject = "Please add a subject.";
    if (!formValues.message.trim()) errors.message = "Please add a short message.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "submitting" || !validateForm()) return;

    setFormStatus("submitting");
    setFormError("");
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        if (!response.ok) throw new Error("The contact service returned an error.");
        setFormStatus("success");
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
        setFormStatus("demo");
      }
    } catch (error) {
      setFormStatus("error");
      setFormError(error instanceof Error ? error.message : "The message could not be sent. Please try again.");
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Mohammad Kasim home">
            <span className="brand-mark">MK</span>
            <span className="brand-copy">
              <strong>Mohammad Kasim</strong>
              <small>DEVOPS / CLOUD</small>
            </span>
          </a>

          <nav id="primary-navigation" className={`primary-nav ${menuOpen ? "primary-nav-open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} onClick={closeMenu}>
                {item}
              </a>
            ))}
            <button type="button" className="mobile-resume-link" onClick={() => { closeMenu(); showResumeNotice(); }}>
              <Download size={15} /> Resume
            </button>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setLightTheme((current) => !current)}
              aria-label={lightTheme ? "Switch to dark theme" : "Switch to light theme"}
              title={lightTheme ? "Switch to dark theme" : "Switch to light theme"}
            >
              {lightTheme ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <ExternalAnchor href={links.github} className="nav-github" ariaLabel="Open GitHub profile">
              <Github size={16} />
            </ExternalAnchor>
            <button type="button" className="button button-small button-primary nav-resume" onClick={showResumeNotice}>
              <Download size={15} />
              Download resume
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <XIcon size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section section-pad" id="home">
          <div className="hero-grid page-width">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="hero-badge"><span className="status-dot" /> Building reliable delivery paths</div>
              <h1>
                Mohammad
                <span>Kasim.</span>
              </h1>
              <p className="hero-title">DevOps Engineer <span>|</span> Cloud &amp; Automation Enthusiast</p>
              <p className="hero-intro">
                I build automated CI/CD pipelines and deploy containerized applications using modern DevOps tools. I enjoy solving infrastructure problems and turning manual workflows into reliable and repeatable systems.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my projects <ArrowUpRight size={16} />
                </a>
                <a className="button button-secondary" href="#contact">
                  Contact me <ChevronRight size={16} />
                </a>
                <button type="button" className="button button-secondary" onClick={showResumeNotice}>
                  <Download size={16} /> Download resume
                </button>
                <ExternalAnchor className="button button-ghost" href={links.github}>
                  <Github size={16} /> View GitHub
                </ExternalAnchor>
              </div>
              <div className="hero-meta">
                <div><span className="meta-value">06</span><span>week learning sprint</span></div>
                <div><span className="meta-value">02</span><span>documented project builds</span></div>
                <div><span className="meta-value">∞</span><span>curiosity in motion</span></div>
              </div>
              <div className="social-row">
                <span>Find me in the stack</span>
                <div className="social-links">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <ExternalAnchor key={label} href={href} className="social-link" ariaLabel={label}>
                      <Icon size={17} />
                    </ExternalAnchor>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual-wrap"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
            >
              <div className="visual-label visual-label-top"><span /> SYSTEMS / 001</div>
              <HeroArchitecture reduceMotion={reduceMotion} />
              <div className="visual-label visual-label-bottom">KINDLY AUTOMATE THE BORING PARTS <Sparkles size={13} /></div>
            </motion.div>
          </div>
          <div className="hero-grid-glow" />
        </section>

        <section className="signal-strip">
          <div className="page-width signal-grid">
            <div className="signal-heading"><span className="signal-line" /> CURRENT SIGNAL</div>
            <div className="signal-item"><span>01</span><strong>Learn by shipping</strong><small>Hands-on projects over buzzwords</small></div>
            <div className="signal-item"><span>02</span><strong>Document the path</strong><small>Runbooks that make work repeatable</small></div>
            <div className="signal-item"><span>03</span><strong>Stay honest</strong><small>Evidence first, claims second</small></div>
          </div>
        </section>

        <section className="section-pad content-section" id="about">
          <div className="page-width about-grid">
            <motion.div
              className="about-intro"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="01 / about me"
                title="Curious about the layers beneath the app."
                description="I am pursuing a B.Tech in Computer Science and Engineering at Birla Institute of Applied Science, Bhimtal, while building practical DevOps experience through hands-on projects."
              />
              <ExternalAnchor href={links.linkedin} className="text-link">
                More about my journey <ArrowUpRight size={15} />
              </ExternalAnchor>
            </motion.div>
            <motion.div
              className="about-panel glass-card"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="panel-kicker"><Terminal size={15} /> CURRENTLY EXPLORING</div>
              <p className="about-quote">"The best infrastructure is the kind that lets the team focus on the work — not the handoffs."</p>
              <div className="interest-list">
                {["CI/CD automation", "Linux administration", "Docker & Kubernetes", "AWS cloud infrastructure", "Infrastructure as Code", "Monitoring & observability", "Deployment automation"].map((interest) => (
                  <span key={interest}><Check size={13} /> {interest}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-pad content-section skills-section" id="skills">
          <div className="page-width">
            <SectionHeading
              eyebrow="02 / technical toolkit"
              title="Tools for moving ideas into repeatable systems."
              description="A practical stack built through project work, with enough room left for the next layer of learning."
            />
            <div className="skills-layout">
              <div className="skill-legend">
                <div className="legend-row"><span className="legend-dot practiced" /> Practiced in project work</div>
                <div className="legend-row"><span className="legend-dot learning" /> Currently learning</div>
                <p>Labels keep the distinction clear: explored does not mean expert.</p>
              </div>
              <div className="skill-groups">
                {skillGroups.map(({ label, icon: Icon, accent, skills }) => (
                  <motion.div
                    className={`skill-group skill-group-${accent}`}
                    key={label}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="skill-group-heading"><span className="skill-icon"><Icon size={17} /></span><h3>{label}</h3></div>
                    <div className="skill-chips">
                      {skills.map((skill) => (
                        <span className={`skill-chip ${skill.status}`} key={skill.name}>
                          <span className="skill-chip-mark">{skill.status === "practiced" ? <Check size={11} /> : <Sparkles size={11} />}</span>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad content-section projects-section" id="projects">
          <div className="page-width">
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="03 / featured work"
                title="Proof of practice, not just a list of tools."
                description="Two project stories from the InternCareerPath DevOps Engineering Self-Learning Internship Program."
              />
              <ExternalAnchor href={links.repository} className="text-link text-link-top">Open repository <ArrowUpRight size={15} /></ExternalAnchor>
            </div>

            <motion.article
              className="project-card project-card-primary"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={reveal}
              transition={{ duration: 0.65 }}
            >
              <div className="project-card-topline"><span>PROJECT / 01</span><span className="project-index">01 — 02</span></div>
              <div className="project-card-grid">
                <div className="project-copy">
                  <div className="project-title-row"><span className="project-icon"><Rocket size={19} /></span><div><h3>CI/CD Pipeline with AWS EC2</h3><span className="project-subtitle">From Python commit to verified container</span></div></div>
                  <p className="project-overview">Built a Python application with automated tests and Docker containerization. Implemented a GitHub Actions workflow to run tests, build a Docker image and deploy the application to AWS EC2.</p>
                  <div className="project-details-grid">
                    <div><span className="detail-label">Problem solved</span><p>Turn a manual build-and-deploy path into a repeatable workflow with an explicit verification step.</p></div>
                    <div><span className="detail-label">Key implementation</span><p>Pytest checks, Docker image packaging, GitHub Actions orchestration, EC2 deployment and a documented runbook.</p></div>
                  </div>
                  <div className="technology-tags">{["Python", "pytest", "Docker", "GitHub Actions", "AWS EC2", "Linux"].map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-links">
                    {projectLinks.pipeline.map(({ label, href, icon: Icon }) => <ExternalAnchor key={label} href={href} className="project-link"><Icon size={14} /> {label} <ArrowUpRight size={13} /></ExternalAnchor>)}
                  </div>
                </div>
                <PipelineDiagram reduceMotion={reduceMotion} />
              </div>
            </motion.article>

            <motion.article
              className="project-card project-card-secondary"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={reveal}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <div className="project-card-topline"><span>PROJECT / 02</span><span className="project-index">02 — 02</span></div>
              <div className="project-card-grid">
                <div className="project-copy">
                  <div className="project-title-row"><span className="project-icon project-icon-violet"><Boxes size={19} /></span><div><h3>Kubernetes Deployment Project</h3><span className="project-subtitle">A small cluster, managed deliberately</span></div></div>
                  <p className="project-overview">Deployed and managed an Nginx application on a local Kubernetes cluster. Practiced replica management, health probes, service exposure, configuration management and namespace isolation.</p>
                  <div className="project-details-grid">
                    <div><span className="detail-label">Problem solved</span><p>Move from a single container mindset to a declarative deployment with health, traffic and configuration concerns separated.</p></div>
                    <div><span className="detail-label">Key implementation</span><p>Three Nginx replicas, NodePort service, liveness/readiness probes, ConfigMap, Secret and development namespace.</p></div>
                  </div>
                  <div className="technology-tags">{["Kubernetes", "Minikube", "kubectl", "Nginx", "YAML", "Docker"].map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-links">
                    {projectLinks.kubernetes.map(({ label, href, icon: Icon }) => <ExternalAnchor key={label} href={href} className="project-link"><Icon size={14} /> {label} <ArrowUpRight size={13} /></ExternalAnchor>)}
                  </div>
                </div>
                <KubernetesDiagram reduceMotion={reduceMotion} />
              </div>
            </motion.article>
          </div>
        </section>

        <section className="section-pad content-section experience-section" id="experience">
          <div className="page-width">
            <SectionHeading
              eyebrow="04 / experience timeline"
              title="Six weeks of learning in public."
              description="Project-based experience from the InternCareerPath DevOps Engineering Self-Learning Internship Program — not formal employment, and labelled with the evidence available in the repository."
            />
            <div className="timeline">
              <div className="timeline-spine" />
              {timeline.map((item, index) => (
                <motion.div
                  className="timeline-item"
                  key={item.week}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={reveal}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <div className={`timeline-marker ${item.status}`}><span>{item.week}</span></div>
                  <div className="timeline-content">
                    <div className="timeline-meta"><span>WEEK {item.week}</span><span className={`evidence-status ${item.status}`}>{item.status === "verified" ? <CheckCircle2 size={13} /> : item.status === "documented" ? <FileText size={13} /> : <CircleDot size={13} />} {item.status === "in-progress" ? "ongoing investigation" : item.status}</span></div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.href.startsWith("#") ? <a href={item.href} className="timeline-link">{item.hrefLabel} <ArrowUpRight size={13} /></a> : <ExternalAnchor href={item.href} className="timeline-link">{item.hrefLabel} <ArrowUpRight size={13} /></ExternalAnchor>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad content-section achievements-section" id="achievements">
          <div className="page-width achievements-grid">
            <div>
              <SectionHeading
                eyebrow="05 / achievements"
                title="Credibility is built from the details."
                description="The strongest signals here are the work products that can be inspected: code, manifests, documentation and a clear account of what is still being learned."
              />
              <div className="achievement-list">
                <div className="achievement-item"><span className="achievement-number">01</span><div><h3>CI/CD deployment verification</h3><p>Week 3 documentation records the test, build and deployment flow being verified through GitHub Actions and AWS EC2.</p></div><CheckCircle2 size={18} /></div>
                <div className="achievement-item"><span className="achievement-number">02</span><div><h3>Kubernetes health &amp; configuration practice</h3><p>Week 4 includes replica management, NodePort access, health probes, ConfigMaps, Secrets and namespace work.</p></div><CheckCircle2 size={18} /></div>
                <div className="achievement-item"><span className="achievement-number">03</span><div><h3>Documentation as an engineering tool</h3><p>Runbooks and daily notes make the learning path auditable and easier to repeat.</p></div><CheckCircle2 size={18} /></div>
              </div>
            </div>
            <div className="credentials-card glass-card">
              <div className="credentials-card-icon"><ShieldCheck size={20} /></div>
              <span className="eyebrow">VERIFIED ONLY</span>
              <h3>Certificates &amp; awards</h3>
              <p>No certificate or award is listed yet because supporting links were not supplied in the repository. Add evidence first, then this card can become a source-linked credential list.</p>
              <div className="credential-note"><AlertCircle size={14} /> No invented credentials. No placeholder claims.</div>
              <a href="#contact" className="text-link">Share supporting evidence <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="section-pad content-section connect-section" id="contact">
          <div className="page-width">
            <div className="connect-banner">
              <div className="connect-banner-copy"><span className="eyebrow"><span className="eyebrow-dot" /> OPEN TO CONVERSATIONS</span><h2>Let&apos;s connect and build something great.</h2><p>I&apos;m always interested in connecting with people who work in DevOps, cloud infrastructure, automation and open-source projects. Feel free to reach out about internship opportunities, collaboration or technical discussions.</p></div>
              <div className="connect-banner-actions"><ExternalAnchor href={links.linkedin} className="button button-primary">Connect on LinkedIn <ArrowUpRight size={16} /></ExternalAnchor><ExternalAnchor href={links.github} className="button button-secondary"><Github size={16} /> Explore GitHub</ExternalAnchor></div>
            </div>

            <div className="contact-grid">
              <div className="contact-side">
                <div className="contact-profile-card glass-card">
                  <div className="profile-topline"><span className="eyebrow">PROFILE / 001</span><span className="profile-online"><span /> available to connect</span></div>
                  <div className="profile-identity">
                    {avatarFailed ? <div className="profile-avatar profile-avatar-fallback">MK</div> : <img className="profile-avatar" src="https://github.com/Kasim2908.png?size=160" alt="Mohammad Kasim GitHub avatar" onError={() => setAvatarFailed(true)} />}
                    <div><h3>Mohammad Kasim</h3><p>DevOps Engineer<br />Cloud &amp; Automation Enthusiast</p></div>
                  </div>
                  <p className="profile-card-copy">Find project source, internship notes and the next experiment through the public links below.</p>
                  <div className="profile-actions"><ExternalAnchor href={links.github} className="button button-small button-primary">View GitHub profile <ArrowUpRight size={14} /></ExternalAnchor><ExternalAnchor href={`${links.github}?tab=repositories`} className="button button-small button-secondary">All repositories <ArrowUpRight size={14} /></ExternalAnchor></div>
                </div>
                <div className="contact-links-card">
                  <div className="contact-link-row"><span className="contact-link-icon"><Github size={17} /></span><div><small>GitHub</small><ExternalAnchor href={links.github}>Kasim2908 <ArrowUpRight size={13} /></ExternalAnchor></div></div>
                  <div className="contact-link-row"><span className="contact-link-icon"><Linkedin size={17} /></span><div><small>LinkedIn</small><ExternalAnchor href={links.linkedin}>Connect professionally <ArrowUpRight size={13} /></ExternalAnchor></div></div>
                  <div className="contact-link-row"><span className="contact-link-icon"><Twitter size={17} /></span><div><small>X / Twitter</small><ExternalAnchor href={links.x}>@kasim2908 <ArrowUpRight size={13} /></ExternalAnchor></div></div>
                  <div className="contact-link-row"><span className="contact-link-icon"><Globe2 size={17} /></span><div><small>Existing portfolio</small><ExternalAnchor href={links.existingPortfolio}>Kasim Explore <ArrowUpRight size={13} /></ExternalAnchor></div></div>
                  <div className="contact-link-row contact-placeholder"><span className="contact-link-icon"><Send size={17} /></span><div><small>Email</small><span>[email address to be supplied]</span><em>Placeholder — no email was invented.</em></div></div>
                </div>
              </div>

              <div className="contact-form-card glass-card">
                <div className="form-header"><div><span className="eyebrow">SEND A NOTE</span><h3>Start a useful conversation.</h3></div><span className="form-code">FORM / 06</span></div>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <Field label="Full name" id="name" value={formValues.name} error={fieldErrors.name} onChange={(value) => updateField("name", value)} />
                    <Field label="Email address" id="email" type="email" value={formValues.email} error={fieldErrors.email} onChange={(value) => updateField("email", value)} />
                  </div>
                  <Field label="Subject" id="subject" value={formValues.subject} error={fieldErrors.subject} onChange={(value) => updateField("subject", value)} />
                  <div className="field-group"><label htmlFor="message">Message</label><textarea id="message" rows={5} value={formValues.message} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "message-error" : undefined} onChange={(event) => updateField("message", event.target.value)} placeholder="Tell me what you are building..." />{fieldErrors.message ? <span className="field-error" id="message-error"><AlertCircle size={13} /> {fieldErrors.message}</span> : null}</div>
                  <button type="submit" className="button button-primary form-submit" disabled={formStatus === "submitting"}>{formStatus === "submitting" ? <><LoaderCircle className="spin" size={16} /> Validating...</> : <><Send size={16} /> Validate message</>}</button>
                  <div className="form-feedback" aria-live="polite">
                    {formStatus === "demo" ? <span className="feedback-success"><CheckCircle2 size={15} /> Form validated. This demo does not send email until a backend is configured.</span> : null}
                    {formStatus === "success" ? <span className="feedback-success"><CheckCircle2 size={15} /> Your message was sent through the configured contact service.</span> : null}
                    {formStatus === "error" ? <span className="feedback-error"><AlertCircle size={15} /> {formError}</span> : null}
                  </div>
                </form>
                <p className="form-note"><ShieldCheck size={13} /> No backend is configured by default. Set <code>VITE_CONTACT_FORM_ENDPOINT</code> to connect a form service.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark">MK</span><span className="brand-copy"><strong>Mohammad Kasim</strong><small>DEVOPS / CLOUD</small></span></a><p>DevOps Engineer | Cloud &amp; Automation Enthusiast</p></div>
          <div className="footer-links"><a href="#contact">Contact</a><ExternalAnchor href={links.github}>GitHub</ExternalAnchor><ExternalAnchor href={links.linkedin}>LinkedIn</ExternalAnchor><ExternalAnchor href={links.x}>X</ExternalAnchor></div>
          <div className="footer-note">Designed with curiosity.<br />Built with code.<br />Driven by automation.</div>
        </div>
        <div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Mohammad Kasim</span><span>InternCareerPath / Self-Learning Internship Program</span><a href="#home" aria-label="Back to top"><ArrowDown size={14} className="back-to-top-icon" /> back to top</a></div>
      </footer>

      {notice ? <div className="toast" role="status"><AlertCircle size={17} /><span>{notice}</span><button type="button" onClick={() => setNotice("")} aria-label="Dismiss notification"><XIcon size={16} /></button></div> : null}
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  error,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.value)} placeholder={id === "email" ? "you@example.com" : id === "name" ? "Your name" : "What can we build?"} />
      {error ? <span className="field-error" id={`${id}-error`}><AlertCircle size={13} /> {error}</span> : null}
    </div>
  );
}

export default App;
