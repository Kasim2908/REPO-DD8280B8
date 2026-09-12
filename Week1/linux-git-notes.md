# Linux & Git Notes

## Linux Fundamentals

### Navigation
- `pwd`
- `ls`
- `cd`
- Absolute paths
- Relative paths
- `.` and `..`

### File & Directory Management
- `mkdir`
- `touch`
- `cp`
- `mv`
- `rm`
- `rm -r`
- `rm -rf`

### Redirection
- `>` overwrite output
- `>>` append output

### Searching & Log Analysis
- `grep`
- `grep -R`
- `find`
- `cut`
- `sort`
- `uniq`
- `wc -l`

### Linux Permissions
- `chmod`
- r = 4
- w = 2
- x = 1
- 644
- 750
- 755

### Processes
- `ps`
- `ps aux`
- PID
- `kill`
- SIGTERM
- SIGKILL

### Disk Usage
- `df -h`
- `du -sh`
- `du -sh *`

### Live Logs
- `head`
- `tail`
- `tail -f`

### Pipes
The pipe `|` sends the output of one command as input to another command.

---

## Linux Services & systemd

Linux uses **systemd** to manage many background services.

### systemctl

`systemctl` is used to manage and inspect services.

### Check Service Status

```bash
systemctl status nginx
```

Common service states:

- `active (running)` → service is currently running
- `inactive (dead)` → service is stopped
- `failed` → service failed to start or crashed

### Start a Service

```bash
sudo systemctl start nginx
```

Starts the service immediately.

### Stop a Service

```bash
sudo systemctl stop nginx
```

Stops the service.

### Restart a Service

```bash
sudo systemctl restart nginx
```

Restarts the service.

### Check if Service is Active

```bash
systemctl is-active nginx
```

Example:

```
active
```

or:

```
inactive
```

### Enable a Service

```bash
sudo systemctl enable nginx
```

Configures the service to start automatically during system boot.

### Start vs Enable

| Command | Effect |
|---|---|
| `start` | Start the service now |
| `enable` | Start the service automatically at boot |

---

## Nginx Web Server

Nginx can be used as:

- Web server
- Reverse proxy
- Load balancer
- Static content server

### Start Nginx

```bash
sudo systemctl start nginx
```

### Check Nginx

```bash
systemctl status nginx
```

### Test Nginx

```bash
curl http://localhost
```

If Nginx is running correctly, it returns the web server response.

### Check HTTP Headers

```bash
curl -I http://localhost
```

Example:

```
HTTP/1.1 200 OK
Server: nginx/1.24.0
Content-Type: text/html
```

`200 OK` means the HTTP request was successfully handled.

---

## Environment Variables

Environment variables store configuration information that programs and shells can use.

Common environment variables:

- `PATH`
- `HOME`
- `USER`
- `SHELL`

### View PATH

```bash
echo $PATH
```

`PATH` contains directories where Linux searches for executable commands.

### Find Command Location

```bash
which ls
```

Example:

```
/usr/bin/ls
```

### View Environment Variables

```bash
env
```

or:

```bash
printenv
```

### View a Specific Variable

```bash
printenv USER
printenv HOME
printenv SHELL
```

Example:

```
USER  → kasim
HOME  → /home/kasim
SHELL → /bin/bash
```

### Create an Environment Variable

```bash
export APP_ENV=development
```

Check it:

```bash
echo $APP_ENV
```

or:

```bash
printenv APP_ENV
```

### Remove an Environment Variable

```bash
unset APP_ENV
```

### Custom Command Using PATH

Create a personal bin directory:

```bash
mkdir -p ~/bin
```

Create a custom command:

```bash
echo 'echo "Hello from my custom command!"' > ~/bin/hello
```

Make it executable:

```bash
chmod +x ~/bin/hello
```

Add the directory to PATH:

```bash
export PATH="$HOME/bin:$PATH"
```

Run the command:

```bash
hello
```

Output:

```
Hello from my custom command!
```

**Important:** `export PATH=...` changes the `PATH` for the current shell environment only. For persistent configuration, use shell startup files such as `~/.bashrc`.

---

## Linux Networking

Important networking commands:

- `ip`
- `ping`
- `ss`
- `curl`
- `nslookup`

These commands are useful for network and application troubleshooting.

### View Network Interfaces

```bash
ip addr
```

or:

```bash
ip a
```

Common interfaces include:

- `lo` → loopback interface
- `eth0` → primary network interface
- `docker0` → Docker bridge interface
- `br-*` → Docker bridge networks

### Loopback

Common loopback address:

```
127.0.0.1
```

It is used for communication within the local machine.

### Test Network Connectivity

**Ping an IP Address**

```bash
ping 8.8.8.8
```

Tests basic network connectivity to the destination.

**Ping a Domain**

```bash
ping google.com
```

Tests connectivity and requires DNS resolution.

### DNS with nslookup

DNS translates domain names into IP addresses.

Example: `google.com` → IP address

Command:

```bash
nslookup google.com
```

### DNS Records

- **A record:** Hostname → IPv4 address
- **AAAA record:** Hostname → IPv6 address

DNS commonly uses **Port 53**.

### Routing Table

View the routing table:

```bash
ip route
```

Example:

```
default via 172.23.16.1 dev eth0
```

The default route is used when there is no more specific route for a destination.

### Listening Ports with ss

The `ss` command displays socket and network connection information.

```bash
ss -tulnp
```

Options:

- `-t` → TCP
- `-u` → UDP
- `-l` → listening sockets
- `-n` → numeric addresses and ports
- `-p` → process information

### Check Port 80

```bash
sudo ss -tulnp | grep ':80'
```

Example:

```
tcp LISTEN 0 511 0.0.0.0:80
```

This means something is listening on TCP port 80.

If the output contains `nginx`, Nginx owns the listening socket.

### Common Network Ports

| Port | Service |
|---|---|
| 22 | SSH |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |

---

## Practical Nginx Troubleshooting

When users report that a website is unavailable, follow a structured troubleshooting process.

```
Website unavailable
        ↓
Is Nginx running?
        ↓
systemctl status nginx
        ↓
Is port 80 listening?
        ↓
ss -tulnp | grep ':80'
        ↓
Does local HTTP request work?
        ↓
curl -I http://localhost
        ↓
Check external network / firewall / DNS
```

### Step 1 — Check the Service

```bash
systemctl status nginx
```

If inactive:

```bash
sudo systemctl start nginx
```

### Step 2 — Check Port 80

```bash
sudo ss -tulnp | grep ':80'
```

If nothing is returned, nothing is currently listening on port 80.

### Step 3 — Test Locally

```bash
curl -I http://localhost
```

Expected response:

```
HTTP/1.1 200 OK
```

If localhost works but external users cannot access the website, investigate:

- Firewall rules
- Network connectivity
- DNS
- Cloud security-group rules
- External routing

---

## DevOps Troubleshooting Mindset

Do not randomly change or delete things when troubleshooting.

Follow a structured approach:

```
Observe
   ↓
Identify
   ↓
Test
   ↓
Verify
   ↓
Fix
   ↓
Verify Again
```

Instead of immediately restarting a service:

```bash
sudo systemctl restart nginx
```

first investigate:

```bash
systemctl status nginx
```

Then:

```bash
ss -tulnp | grep ':80'
```

Then:

```bash
curl -I http://localhost
```

This helps identify the actual problem instead of blindly changing the system.

---

## Hands-on Practice

Created a Linux practice directory and practiced:

- File and directory creation
- Copying and moving files
- File deletion
- Linux permissions
- Log creation and analysis
- Recursive searching
- Process inspection
- Process termination
- Disk usage inspection
- Live log monitoring
- Linux service management
- Nginx start, stop and status
- Environment variables
- PATH modification
- Creating a custom Linux command
- Network interface inspection
- Network connectivity testing
- DNS resolution
- Routing table inspection
- Listening port inspection
- HTTP connectivity testing
- Nginx troubleshooting

---

## Key Learning

I learned to troubleshoot Linux and DevOps tasks using:

**Observe → Predict → Execute → Verify**

For service and network troubleshooting:

**Check Service → Check Port → Test Application → Investigate External Connectivity**
