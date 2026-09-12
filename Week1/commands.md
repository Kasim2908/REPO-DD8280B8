# Services
systemctl status nginx
systemctl is-active nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# HTTP
curl http://localhost
curl -I http://localhost

# Environment Variables
echo $PATH
which ls
env
printenv
printenv USER
printenv HOME
printenv SHELL
export APP_ENV=development
unset APP_ENV

# Networking
ip addr
ip route
ping 8.8.8.8
ping google.com
nslookup google.com
ss -tulnp
sudo ss -tulnp | grep ':80'
