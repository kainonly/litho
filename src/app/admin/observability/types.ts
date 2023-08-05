import { Meta } from '@antv/g2plot';

export type ExporterName =
  | 'qps_rate'
  | 'error_rate'
  | 'goroutines'
  | 'gc_count'
  | 'cgo_calls'
  | 'mongo_available_connections'
  | 'mongo_open_connections'
  | 'mongo_commands_per_second'
  | 'mongo_query_operations'
  | 'mongo_document_operations'
  | 'mongo_flushes'
  | 'mongo_network_io'
  | 'redis_mem'
  | 'redis_cpu'
  | 'redis_ops_per_sec'
  | 'redis_evi_exp_keys'
  | 'redis_collections_rate'
  | 'redis_connected_slaves'
  | 'redis_hit_rate'
  | 'redis_network_io'
  | 'nats_cpu'
  | 'nats_mem'
  | 'nats_connections'
  | 'nats_subscriptions'
  | 'nats_slow_consumers'
  | 'nats_msg_io'
  | 'nats_bytes_io';

export const MetaType: Record<string, Record<string, Meta>> = {
  default: {
    value: {
      alias: '数值'
    }
  },
  k: {
    value: {
      alias: '数值',
      formatter: v => {
        if (v > 1000000) {
          return (v / 1000000).toFixed(2) + ' m';
        }
        if (v > 1000) {
          return (v / 1000).toFixed(2) + ' k';
        }
        return Math.trunc(v);
      }
    }
  },
  per: {
    value: {
      alias: '数值',
      formatter: v => {
        return v.toFixed(2);
      }
    }
  },
  ops: {
    value: {
      alias: '数值',
      formatter: value => `${value} ops`
    }
  },
  bytes: {
    value: {
      alias: '数值',
      formatter: v => {
        if (v > 1048576) {
          return (v / 1048576).toFixed(2) + ` M`;
        }
        if (v > 1024) {
          return (v / 1024).toFixed(2) + ` k`;
        }
        return `${v} b`;
      }
    }
  }
};
