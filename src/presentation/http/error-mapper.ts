import { DomainError } from "@/core/domain/errors/domain-errors";

export interface HttpErrorBody {
  code: string;
  message: string;
  field?: string;
}

const STATUS_MAP: Record<string, number> = {
  NOT_FOUND: 404,
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  WRISTBAND_INACTIVE: 410,
  INVALID_ACTIVATION_CODE: 400,
};

export function mapDomainErrorToHttp(error: unknown): {
  status: number;
  body: HttpErrorBody;
} {
  if (error instanceof DomainError) {
    return {
      status: STATUS_MAP[error.code] ?? 400,
      body: {
        code: error.code,
        message: error.message,
        ...("field" in error && typeof error.field === "string"
          ? { field: error.field }
          : {}),
      },
    };
  }

  return {
    status: 500,
    body: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" },
  };
}
