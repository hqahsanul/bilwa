.PHONY: start-all restart-all stop-all build-all start-app restart-app start-nginx restart-nginx logs

start-all:
	@./scripts/ops.sh start-all

restart-all:
	@./scripts/ops.sh restart-all

stop-all:
	@./scripts/ops.sh stop-all

build-all:
	@./scripts/ops.sh build-all

start-app:
	@./scripts/ops.sh start-app

restart-app:
	@./scripts/ops.sh restart-app

start-nginx:
	@./scripts/ops.sh start-nginx

restart-nginx:
	@./scripts/ops.sh restart-nginx

logs:
	@./scripts/ops.sh logs