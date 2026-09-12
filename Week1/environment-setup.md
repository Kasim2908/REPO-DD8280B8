# Environment Setup

## Overview

This document contains the environment setup and verification performed for the DevOps Engineering Self-Learning Internship.

The practical environment used for this learning program is:

- Windows
- WSL2
- Ubuntu Linux
- Bash Shell
- Git
- GitHub
- Nginx
- Docker

---

## 1. Linux Environment

The Linux environment is running through **WSL2 (Windows Subsystem for Linux 2)**.

### Check Linux Kernel

```bash
uname -a
```

This command displays information about:

- Linux kernel
- Hostname
- Kernel version
- Architecture
- Operating system environment

The environment is running on **WSL2**, **x86_64**.

---

## 2. Check Current User

```bash
whoami
```

Example:

```
kasim
```

The current Linux user is `kasim`.

---

## 3. Check Current Directory

```bash
pwd
```

Example:

```
/home/kasim
```

The home directory of the current user is `/home/kasim`.

---

## 4. Check Shell

```bash
echo $SHELL
```

Example:

```
/bin/bash
```

The Bash shell is used for executing Linux commands and scripts.

---

## 5. Check Home Directory

```bash
echo $HOME
```

Example:

```
/home/kasim
```

`$HOME` represents the current user's home directory.

---

## 6. Check System Disk Usage

```bash
df -h
```

The `df -h` command displays filesystem disk usage in a human-readable format.

Important information includes:

- Filesystem
- Total size
- Used space
- Available space
- Usage percentage
- Mount point

---

## 7. Check Directory Contents

```bash
ls
```

For detailed information:

```bash
ls -l
```

For hidden files:

```bash
ls -la
```

---

## 8. Git Installation Verification

Check whether Git is installed:

```bash
git --version
```

Git is used for:

- Version control
- Tracking changes
- Creating commits
- Working with branches
- Pushing code to GitHub

---

## 9. Git Configuration

Check configured Git username:

```bash
git config --global user.name
```

Check configured Git email:

```bash
git config --global user.email
```

These settings are used when creating Git commits.

---

## 10. GitHub Repository

The internship repository assigned for this program is:

```
REPO-DD8280B8
```

The repository is organized using weekly folders.

Current Week 1 structure:

```
REPO-DD8280B8/
│
├── Week1/
│   ├── commands.md
│   ├── environment-setup.md
│   ├── linux-git-notes.md
│   └── project-selection.md
│
└── README.md
```

---

## 11. Linux Practice Directory

A dedicated directory was created for Linux hands-on practice:

```bash
mkdir -p ~/linux-devops-practice
```

Navigate to the directory:

```bash
cd ~/linux-devops-practice
```

Verify the location:

```bash
pwd
```

Expected:

```
/home/kasim/linux-devops-practice
```

---

## 12. Nginx Installation and Verification

Nginx was used to practice Linux service management and web-server troubleshooting.

Check Nginx status:

```bash
systemctl status nginx
```

Start Nginx:

```bash
sudo systemctl start nginx
```

Stop Nginx:

```bash
sudo systemctl stop nginx
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Check whether Nginx is active:

```bash
systemctl is-active nginx
```

---

## 13. Enable Nginx

Configure Nginx to start automatically during system boot:

```bash
sudo systemctl enable nginx
```

Difference:

| Command | Effect |
|---|---|
| `start` | Start the service now |
| `enable` | Start the service automatically at boot |

---

## 14. Test Nginx with curl

Test the local Nginx server:

```bash
curl http://localhost
```

Check only HTTP headers:

```bash
curl -I http://localhost
```

A successful response contains:

```
HTTP/1.1 200 OK
```

This confirms that the local web server is responding to an HTTP request.

---

## 15. Check Listening Port

Nginx normally listens on HTTP port 80.

Check listening ports:

```bash
ss -tulnp
```

Check specifically for port 80:

```bash
sudo ss -tulnp | grep ':80'
```

Example:

```
tcp LISTEN 0 511 0.0.0.0:80
```

This indicates that a service is listening on TCP port 80.

---

## 16. Environment Variables

Environment variables were explored as part of the Linux environment setup.

View the PATH:

```bash
echo $PATH
```

View all environment variables:

```bash
env
```

or:

```bash
printenv
```

Check specific variables:

```bash
printenv USER
printenv HOME
printenv SHELL
```

---

## 17. Custom PATH Configuration

A personal bin directory was created:

```bash
mkdir -p ~/bin
```

A custom command was created:

```bash
echo 'echo "Hello from my custom command!"' > ~/bin/hello
```

Make it executable:

```bash
chmod +x ~/bin/hello
```

Add the directory to the current PATH:

```bash
export PATH="$HOME/bin:$PATH"
```

Run the custom command:

```bash
hello
```

Expected output:

```
Hello from my custom command!
```

---

## 18. Network Interface Verification

View network interfaces:

```bash
ip addr
```

or:

```bash
ip a
```

Important interfaces observed include:

- `lo`
- `eth0`
- `docker0`
- `br-*`

**Loopback**

```
127.0.0.1
```

The loopback address is used for communication within the local machine.

**eth0**

`eth0` is the primary network interface in the WSL environment.

**Docker Interfaces**

`docker0` and `br-*` interfaces are associated with Docker networking.

---

## 19. Network Connectivity Test

Test connectivity using an IP address:

```bash
ping 8.8.8.8
```

Test connectivity using a domain:

```bash
ping google.com
```

The second test also requires DNS resolution.

---

## 20. DNS Verification

DNS resolution was tested using:

```bash
nslookup google.com
```

DNS translates domain names into IP addresses.

Common DNS records:

| Record | Maps to |
|---|---|
| A | IPv4 address |
| AAAA | IPv6 address |

DNS commonly operates on **Port 53**.

---

## 21. Routing Verification

View the routing table:

```bash
ip route
```

The routing table contains information about where network traffic should be sent.

Example:

```
default via 172.23.16.1 dev eth0
```

The default route is used when there is no more specific route for a destination.

---

## 22. Security Considerations

Sensitive information should never be committed to GitHub.

Examples of files that should not be committed:

```
*.pem
*.key
.env
```

Never commit:

- AWS access keys
- Private keys
- Passwords
- API tokens
- Database credentials
- Other secrets

A `.gitignore` file can be used to prevent accidental commits of sensitive files.

Example:

```
*.pem
*.key
.env
```

---

## 23. Environment Verification Checklist

**Linux**
- [x] WSL2 environment configured
- [x] Linux kernel verified
- [x] Current user verified
- [x] Home directory verified
- [x] Bash shell verified
- [x] Disk usage checked

**Git**
- [x] Git installation verified
- [x] Git configuration checked
- [x] GitHub repository available

**Nginx**
- [x] Nginx service checked
- [x] Nginx started and stopped
- [x] Nginx enabled
- [x] Local HTTP request tested
- [x] Port 80 verified

**Environment Variables**
- [x] PATH inspected
- [x] Environment variables inspected
- [x] Custom environment variable created
- [x] Custom command created
- [x] Custom PATH configuration tested

**Networking**
- [x] Network interfaces inspected
- [x] IP connectivity tested
- [x] DNS resolution tested
- [x] Routing table inspected
- [x] Listening ports inspected

---

## 24. Troubleshooting Approach

During environment setup and troubleshooting, the following approach was followed:

```
Observe
   ↓
Predict
   ↓
Execute
   ↓
Verify
```

For web-server troubleshooting:

```
Check Service
     ↓
Check Listening Port
     ↓
Test Local HTTP Request
     ↓
Check Network / Firewall / DNS
```

---

## Conclusion

The Linux/WSL2 environment was prepared and verified for DevOps learning and hands-on practice.

The environment now supports:

- Linux administration
- Git and GitHub
- Bash commands
- Environment variables
- Nginx
- Networking
- Service management
- Troubleshooting
- Future Docker, Kubernetes and CI/CD practice
