from optparse import OptionParser
import sys
import time
from util import (
        Logger,
        pretty_json,
        json,
        APPTypeError,
    )
import threading

class TimeExceedError(Exception):
    pass

logger = Logger("main")

from Joyrun import JoyrunClient as Client, __date__

def run_client():
    try:
        client = Client(sys.argv)
        client.run()
    except Exception as err:
        logger.error("upload record failed !")
        raise err
    else:
        print("upload record success !")

if __name__ == "__main__":
    # 设置超时时间（秒）
    timeout_seconds = 10  # 适当调整这个值

    # 创建线程
    client_thread = threading.Thread(target=run_client)

    try:
        # 启动线程
        client_thread.start()

        # 等待线程运行超时时间
        client_thread.join(timeout=timeout_seconds)

        # 如果线程仍在运行，终止它
        if client_thread.is_alive():
            logger.error(f"Client execution exceeded {timeout_seconds} seconds. Terminating.")
            raise TimeExceedError
            sys.exit(1)

    except Exception as err:
        logger.error(f"An error occurred: {err}")
        sys.exit(1)
    else:
        print("Thread completed successfully.")
