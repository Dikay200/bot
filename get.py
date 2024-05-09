import os
import threading
import time
import random
import sys
from datetime import datetime
import requests
from colorama import Fore, Style

#Màu
red = Fore.RED
yellow = Fore.YELLOW
green = Fore.GREEN
blue = Fore.BLUE
orange = Fore.RED + Fore.YELLOW
pretty = Fore.LIGHTMAGENTA_EX + Fore.LIGHTCYAN_EX
magenta = Fore.MAGENTA
lightblue = Fore.LIGHTBLUE_EX
cyan = Fore.CYAN
gray = Fore.LIGHTBLACK_EX + Fore.WHITE
dark_green = Fore.GREEN + Style.BRIGHT
pink = Fore.MAGENTA
green = Fore.GREEN
reset = Style.RESET_ALL
xnhac = "\033[1;36m"
do = "\033[1;31m"
luc = "\033[1;32m"
vang = "\033[1;33m"
xduong = "\033[1;34m"
hong = "\033[1;35m"
trang = "\033[1;37m"
whiteb="\033[1;37m"
red="\033[0;31m"
redb="\033[1;31m"
end='\033[0m'

output_lock = threading.Lock()
#________
def get_time_rn():
    date = datetime.now()
    hour = date.hour
    minute = date.minute
    second = date.second
    timee = "{:02d}:{:02d}:{:02d}".format(hour, minute, second)
    return timee

def clear():
    os.system("cls" if os.name == "nt" else "clear")

class ProxyInfo:
    def __init__(self, proxy):
        self.proxy = proxy
        self.location = None
        self.type = None
        self.response_time = None

    def determine_location(self):
        try:
            response = requests.get('https://ipinfo.io/json', proxies={"http": self.proxy, "https": self.proxy}, timeout=5)
            self.location = response.json().get("country", "NO")
            return True
        except:
            self.location = "NO"
            return False

    def determine_type(self):
        types = ["http", "https"]
        for t in types:
            try:
                response = requests.get("http://judge1.api.proxyscrape.com/", proxies={t: self.proxy}, timeout=5)
                if response.status_code == 200:
                    self.type = t.upper()
                    return
            except:
                pass
        self.type = "NO"

    def measure_response_time(self):
        try:
            response = requests.get("http://judge1.api.proxyscrape.com/", proxies={"http": self.proxy, "https": self.proxy}, timeout=5)
            self.response_time = response.elapsed.total_seconds()
        except:
            self.response_time = float('inf')

    def get_info(self):
        is_live = self.determine_location()
        if is_live:
            self.determine_type()
            self.measure_response_time()
        return is_live

def check_live_proxies(filename, num_threads):
    live_proxies = {"HTTP": [], "HTTPS": [], "NO": []}
    printed_count = 0

    def check_proxy_thread(proxy):
        nonlocal printed_count
        proxy_info = ProxyInfo(proxy)
        if proxy_info.get_info(): 
            live_proxies[proxy_info.type].append(proxy_info.proxy)
            printed_count += 1
            total = printed_count
            time_rn = get_time_rn()
            print(f"\x1b[38;5;255m[ \x1b[38;5;160mCountry : \x1b[38;5;255m{proxy_info.location}{reset} \x1b[38;5;255m] \x1b[38;5;160m| \x1b[38;5;255m(\x1b[38;5;160mTotal : \x1b[38;5;255m{total}{reset}) \x1b[38;5;255m{pretty}\x1b[38;5;160mProxy --> \x1b[38;5;255m{proxy}{Fore.RESET}")
    
    with open(filename, "r") as file:
        proxies = file.readlines()

    threads = []
    for proxy in proxies:
        proxy = proxy.strip()
        thread = threading.Thread(target=check_proxy_thread, args=(proxy,))
        thread.start()
        threads.append(thread)
        if len(threads) >= num_threads:
            for thread in threads:
                thread.join()
    
    return live_proxies

if __name__ == "__main__":
    try:
        time.sleep(1.5)
        clear()
        choice = input("\x1b[38;5;160mChọn chế độ của bạn \x1b[38;5;255m(1/2): \033[1;33m")
        #loc proxy 
        if choice == "2":
            print("\x1b[38;5;255mANON XSEVEN \x1b[38;5;160m| \x1b[38;5;255mNhập tên file chứa proxy !!! \x1b[38;5;160m| \x1b[38;5;255mVí dụ : proxies.txt")
            filename = input("\x1b[38;5;160m>>> \x1b[38;5;255m")
            print("\x1b[38;5;255mNhập số luồng !!! \x1b[38;5;160m| \x1b[38;5;255mVí dụ : 22222")
            num_threads = int(input("\x1b[38;5;160m>>> \x1b[38;5;255m"))
            check_proxy = check_live_proxies(filename, num_threads)            
            with open("check_live_proxies.txt", "w") as file:
                for proxy_type, proxies in check_proxy.items():
                    for proxy in proxies:
                        file.write(f"{proxy_type}: {proxy}\n")
            print("\033[1;31mCác proxy đã được lọc và lưu vào tệp \033[1;37mcheck_live_proxies.txt.")
            exit()
        #Đào proxy   
        elif choice == "1":
            raw_proxy_sites = [                   
                   "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=all&timeout=1000&country=all&ssl=all&anonymity=all",
                   "https://api.openproxylist.xyz/http.txt",
                   "https://api.openproxylist.xyz/socks5.txt",
                   "https://api.openproxylist.xyz/socks4.txt",
                   "http://alexa.lr2b.com/proxylist.txt",
                   "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
                   "http://worm.rip/http.txt",
                   "https://proxy-spider.com/api/proxies.example.txt",
                   "https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt",
                   "https://proxyspace.pro/http.txt",
                   "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt",
                   "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt",
                   "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt",
                   "https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt",
                   "https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt",
                   "https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt",
                   "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
                   "https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt",
                   "https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt",
                   "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
                   "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt",
                   "https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt",
                   "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt",
                   "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt",
                   "https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt",
                   "https://raw.githubusercontent.com/almroot/proxylist/master/list.txt",
                   "https://openproxylist.xyz/http.txt",
                   "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt",
                   "http://rootjazz.com/proxies/proxies.txt",
                   "https://www.proxy-list.download/api/v1/get?type=http",
                   "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
                   "https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt",
                   "http://alexa.lr2b.com/proxylist.txt",
                   "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt",
                   "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
                   "https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt",
                   "https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt",
                   "https://proxy-spider.com/api/proxies.example.txt",
                   "https://multiproxy.org/txt_all/proxy.txt",
                   "https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt",
                   "https://proxyspace.pro/http.txt",
                   "https://proxyspace.pro/https.txt",
                   "https://proxyspace.pro/https.txt",
                   "https://raw.githubusercontent.com/almroot/proxylist/master/list.txt",
                   "https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt",
                   "https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/HTTP.txt",
                   "https://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt",
                   "https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt",
                   "https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt",
                   "https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt",
                   "https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt",
                   "https://raw.githubusercontent.com/saisuiu/uiu/main/free.txt",
                   "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt",
                   "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
                   "https://rootjazz.com/proxies/proxies.txt",
                   "https://www.proxy-list.download/api/v1/get?type=https",
                   "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
                   "https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/free.txt",
                   "https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/cnfree.txt",
                   "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt",
                   "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt",
                   "https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt",
                   "https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt",
                   "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt",
                   "https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/http.txt",
                   "https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt",
                   "https://sunny9577.github.io/proxy-scraper/proxies.txt", ]
            proxies = set()
            for site in raw_proxy_sites:
                try:
                    response = requests.get(site)
                    response.raise_for_status()  
                    for line in response.text.split("\n"):
                        if ":" in line:
                            proxies.add(line.strip())
                except Exception as e:
                    print(f"\x1b[38;5;160mĐã xảy ra lỗi khi lấy proxy từ \x1b[38;5;255m{site}: \033[0;31m{e}")
            with open("proxies.txt", "w") as file:
                for proxy in proxies:
                    file.write(proxy + "\n")
            print("\x1b[38;5;160mCác proxy đã được đào và lưu vào tệp \033[1;37mproxies.txt.")
        else:
            print("\x1b[38;5;160mLựa chọn không hợp lệ. Vui lòng chọn \033[1;33m1 \x1b[38;5;160mhoặc \033[1;33m2.")           
    except KeyboardInterrupt:
        time.sleep(1)
        exit()